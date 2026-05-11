import { NextResponse } from "next/server";

/**
 * POST /api/ai/handoff-summary
 *
 * Generates an SSE-streamed handoff summary for a call. This is the real
 * shape; swap the placeholder generator for Anthropic / OpenAI streaming
 * once API keys are configured. Kept provider-agnostic so the frontend
 * contract is stable.
 */
export const runtime = "edge";

type Payload = {
  transcript: Array<{ speaker: string; text: string }>;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!Array.isArray(body.transcript) || body.transcript.length === 0) {
    return NextResponse.json({ error: "transcript_required" }, { status: 400 });
  }

  // Placeholder streaming generator. Real impl: call Anthropic Messages API
  // with stream: true and forward the chunks.
  const customerLines = body.transcript
    .filter((t) => t.speaker === "customer")
    .map((t) => t.text)
    .join(" ");

  const chunks = [
    "Caller intent: ",
    customerLines.slice(0, 80) || "unspecified",
    ".\nNext step: route to sales rep for follow-up.\n",
    "Confidence: high.",
  ];

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta: chunk })}\n\n`));
        await new Promise((r) => setTimeout(r, 80));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
