import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadStatusPill } from "@/components/LeadStatusPill";
import { leadTimelines, mockLeads } from "@agentdynamics/types/mock";
import type { LeadEvent } from "@agentdynamics/types";

const eventIcon: Record<LeadEvent["kind"], string> = {
  lead_created: "✦",
  call_inbound: "◉",
  sms_received: "✉",
  ai_summary: "✺",
  appointment_booked: "▤",
  human_note: "✎",
  status_changed: "▣",
};

const eventTone: Record<LeadEvent["kind"], string> = {
  lead_created: "bg-cyan-50 text-cyan-700 ring-cyan-100",
  call_inbound: "bg-blue-50 text-blue-700 ring-blue-100",
  sms_received: "bg-violet-50 text-violet-700 ring-violet-100",
  ai_summary: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  appointment_booked: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  human_note: "bg-amber-50 text-amber-700 ring-amber-100",
  status_changed: "bg-slate-100 text-slate-600 ring-slate-200",
};

function timeFmt(iso: string): string {
  return new Date(iso).toLocaleString();
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = mockLeads.find((l) => l.id === id);
  if (!lead) notFound();
  const events = leadTimelines[lead.id] ?? [];

  return (
    <main className="p-6 pb-20">
      <Link href="/leads" className="text-sm text-cyan-600 hover:underline">
        ← Back to leads
      </Link>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-navy-900">
            {lead.fullName}
          </h1>
          <p className="mt-1 text-sm text-slate">
            {lead.phone}
            {lead.email ? ` · ${lead.email}` : ""}
          </p>
        </div>
        <LeadStatusPill status={lead.status} />
      </header>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <p className="text-xs uppercase tracking-wide text-slate">Vehicle interest</p>
          <p className="mt-1 text-base font-medium text-navy-900">
            {lead.vehicleInterest ?? <span className="text-slate">—</span>}
          </p>
          <p className="mt-3 text-xs uppercase tracking-wide text-slate">Intent</p>
          <p className="mt-1 text-sm text-navy-800">{lead.intent}</p>
        </div>
        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <p className="text-xs uppercase tracking-wide text-slate">AI lead score</p>
          <p className="mt-1 text-3xl font-semibold text-navy-900">{lead.score}</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-pill bg-mist">
            <div className="h-full bg-cyan-500" style={{ width: `${lead.score}%` }} />
          </div>
        </div>
        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <p className="text-xs uppercase tracking-wide text-slate">Source</p>
          <p className="mt-1 text-sm text-navy-800">{lead.source.replace(/_/g, " ")}</p>
          {lead.sourceChannel ? (
            <p className="mt-1 text-xs text-slate">via {lead.sourceChannel.replace(/_/g, ".")}</p>
          ) : null}
          <p className="mt-3 text-xs uppercase tracking-wide text-slate">Created</p>
          <p className="mt-1 text-sm text-navy-800">{timeFmt(lead.createdAt)}</p>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
        <h2 className="text-base font-semibold text-navy-900">Timeline</h2>
        {events.length === 0 ? (
          <p className="mt-3 text-sm text-slate">No events yet for this lead.</p>
        ) : (
          <ol className="mt-4 space-y-4">
            {events.map((e) => (
              <li key={e.id} className="flex gap-4">
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ring-1 ${eventTone[e.kind]}`}>
                  <span aria-hidden className="text-base">{eventIcon[e.kind]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-navy-900">{e.title}</p>
                    <p className="shrink-0 text-xs text-slate">{timeFmt(e.at)}</p>
                  </div>
                  {e.body ? <p className="mt-1 text-sm text-navy-800">{e.body}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
