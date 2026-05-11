import { NextResponse } from "next/server";
import {
  mockAppointments,
  mockCalls,
  mockLeads,
  mockVehicles,
  DEALERSHIP_NAME,
} from "@agentdynamics/types/mock";

export const runtime = "edge";

type ChatMessage = { role: "user" | "assistant"; text: string };
type Payload = { messages: ChatMessage[] };

const SYSTEM_PROMPT = `You are the AgentDynamics AI Assistant for ${DEALERSHIP_NAME}, a Toyota dealership.

You help the dealership manager understand their leads, calls, appointments, and inventory. Be concise, factual, and skim-friendly — short paragraphs, bullet lists when comparing items. Never invent leads or vehicles that don't appear in the data below.

When asked to draft a follow-up SMS or email, write in a friendly, professional tone, under 280 characters for SMS. Always personalize with the lead's first name and the specific vehicle they're interested in.

Today's dealership data (live):
LEADS:
${mockLeads
  .map(
    (l) =>
      `- ${l.fullName} (${l.phone}) · ${l.vehicleInterest ?? l.intent} · status=${l.status} · score=${l.score} · source=${l.sourceChannel ?? l.source}`
  )
  .join("\n")}

UPCOMING APPOINTMENTS:
${mockAppointments
  .map(
    (a) =>
      `- ${a.leadName} · ${a.type} · ${new Date(a.scheduledAt).toLocaleString()} · status=${a.status}${a.notes ? ` · notes: ${a.notes}` : ""}`
  )
  .join("\n")}

RECENT CALLS:
${mockCalls
  .map(
    (c) =>
      `- ${new Date(c.startedAt).toLocaleString()} · outcome=${c.outcome}${c.summary ? ` · summary: ${c.summary}` : ""}`
  )
  .join("\n")}

INVENTORY (lot vehicles):
${mockVehicles
  .map(
    (v) =>
      `- ${v.year} ${v.make} ${v.model} ${v.trim} · ${v.exteriorColor} · ${v.condition} · $${v.price.toLocaleString()} · ${v.status}`
  )
  .join("\n")}`;

/** SSE helper: emits a delta event. */
function sseDelta(controller: ReadableStreamDefaultController, encoder: TextEncoder, text: string) {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta: text })}\n\n`));
}
function sseDone(controller: ReadableStreamDefaultController, encoder: TextEncoder) {
  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
}

/** Smart-template fallback when no LLM key is configured. */
function templateAnswer(prompt: string): string {
  const p = prompt.toLowerCase();

  if (p.includes("hot") || p.includes("top") || p.includes("hottest")) {
    const top = [...mockLeads].sort((a, b) => b.score - a.score).slice(0, 3);
    const lines = top.map(
      (l) =>
        `• ${l.fullName} — score ${l.score}, ${l.vehicleInterest ?? l.intent}, status ${l.status.replace(/_/g, " ")}`
    );
    return `Top scoring leads right now:\n${lines.join("\n")}`;
  }

  if (p.includes("sms") || p.includes("text") || p.includes("draft") || p.includes("follow")) {
    const named = mockLeads.find((l) => p.includes(l.fullName.split(" ")[0]!.toLowerCase()));
    const target = named ?? mockLeads[0]!;
    const firstName = target.fullName.split(" ")[0];
    const interest = target.vehicleInterest ?? "your visit";
    return `Suggested SMS to ${target.fullName}:\n\n"Hi ${firstName}, this is Jordan at ${DEALERSHIP_NAME}. Following up on the ${interest} — happy to set up a test drive whenever works. Reply STOP to opt out."`;
  }

  if (p.includes("appointment") || p.includes("test drive") || p.includes("unconfirmed")) {
    const lines = mockAppointments.map(
      (a) =>
        `• ${new Date(a.scheduledAt).toLocaleString()} — ${a.leadName} · ${a.type.replace(/_/g, " ")} · ${a.status}`
    );
    return `Upcoming appointments:\n${lines.join("\n")}`;
  }

  if (p.includes("inventory") || p.includes("rav4") || p.includes("camry") || p.includes("stock")) {
    const matches = mockVehicles
      .filter((v) => p.includes(v.model.toLowerCase()) || p.includes("inventory"))
      .slice(0, 5);
    const lines = matches.map(
      (v) =>
        `• ${v.year} ${v.make} ${v.model} ${v.trim} (${v.exteriorColor}) — $${v.price.toLocaleString()} · ${v.status}`
    );
    return matches.length
      ? `Matching inventory:\n${lines.join("\n")}`
      : "I couldn't find vehicles matching that. Try a model name like RAV4, Camry, or 4Runner.";
  }

  return `I can help with leads, calls, appointments, and inventory at ${DEALERSHIP_NAME}. Try asking "show hottest leads" or "draft a follow-up SMS to Marcus".`;
}

/** Stream a string out as SSE in word chunks so it feels live. */
async function streamWords(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
  text: string
) {
  const words = text.split(/(\s+)/);
  for (const w of words) {
    sseDelta(controller, encoder, w);
    await new Promise((r) => setTimeout(r, 18));
  }
}

/** Call Gemini API with streaming. Returns the SSE-ready stream. */
async function streamFromGemini(
  apiKey: string,
  messages: ChatMessage[]
): Promise<Response> {
  // gemini-1.5-flash has a generous free tier (1500 req/day, 50 RPM)
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.text }],
  }));

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.4, maxOutputTokens: 600 },
    }),
  });
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "messages_required" }, { status: 400 });
  }

  const lastUser = [...body.messages].reverse().find((m) => m.role === "user");
  const userPrompt = lastUser?.text ?? "";
  const apiKey = process.env.GEMINI_API_KEY;

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        if (apiKey) {
          const upstream = await streamFromGemini(apiKey, body.messages);
          if (!upstream.ok || !upstream.body) {
            const errBody = await upstream.text().catch(() => "");
            await streamWords(
              controller,
              encoder,
              `Gemini upstream returned ${upstream.status}. Falling back to template.\n\n` +
                templateAnswer(userPrompt)
            );
            console.error("Gemini error:", upstream.status, errBody.slice(0, 500));
          } else {
            // Forward Gemini's SSE stream, extracting text from each chunk
            const reader = upstream.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";
            for (;;) {
              const { value, done } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              const events = buffer.split("\n\n");
              buffer = events.pop() ?? "";
              for (const ev of events) {
                const dataLine = ev.split("\n").find((l) => l.startsWith("data: "));
                if (!dataLine) continue;
                const json = dataLine.slice(6).trim();
                if (!json || json === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(json);
                  const parts: Array<{ text?: string }> =
                    parsed?.candidates?.[0]?.content?.parts ?? [];
                  for (const p of parts) {
                    if (typeof p.text === "string" && p.text.length > 0) {
                      sseDelta(controller, encoder, p.text);
                    }
                  }
                } catch {
                  // ignore malformed chunk
                }
              }
            }
          }
        } else {
          // No Gemini key — return the template answer streamed word-by-word
          await streamWords(
            controller,
            encoder,
            `${templateAnswer(userPrompt)}\n\n_(Demo mode — set GEMINI_API_KEY in Vercel env vars for real Gemini responses.)_`
          );
        }
      } catch (err) {
        console.error("AI chat error:", err);
        await streamWords(
          controller,
          encoder,
          "Sorry — the assistant hit an unexpected error. Check server logs."
        );
      } finally {
        sseDone(controller, encoder);
        controller.close();
      }
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
