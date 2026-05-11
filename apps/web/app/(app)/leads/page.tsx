import Link from "next/link";
import { LeadStatusPill } from "@/components/LeadStatusPill";
import { mockLeads } from "@agentdynamics/types/mock";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function scoreTone(score: number): string {
  if (score >= 85) return "text-emerald-600";
  if (score >= 65) return "text-cyan-600";
  return "text-slate";
}

export default function LeadsPage() {
  return (
    <main className="p-4 pb-24 sm:p-6 lg:pb-20">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">Leads</h1>
          <p className="mt-1 text-xs text-slate sm:text-sm">
            {mockLeads.length} active leads in the pipeline.
          </p>
        </div>
      </header>

      {/* Mobile: stacked cards, no horizontal scroll */}
      <ul className="mt-5 space-y-3 md:hidden">
        {mockLeads.map((l) => (
          <li key={l.id}>
            <Link
              href={`/leads/${l.id}`}
              className="block rounded-xl border border-navy-100 bg-white p-4 shadow-soft active:bg-cloud"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold text-navy-900">
                    {l.fullName}
                  </p>
                  <p className="truncate text-xs text-slate">{l.phone}</p>
                </div>
                <LeadStatusPill status={l.status} />
              </div>

              <p className="mt-2 text-sm text-navy-800 line-clamp-1">
                {l.vehicleInterest ?? (
                  <span className="text-slate uppercase tracking-wide text-xs">{l.intent}</span>
                )}
              </p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-pill bg-mist">
                    <div className="h-full bg-cyan-500" style={{ width: `${l.score}%` }} />
                  </div>
                  <span className={`text-xs font-semibold ${scoreTone(l.score)}`}>
                    {l.score}
                  </span>
                </div>
                <span className="shrink-0 text-[11px] text-slate">{timeAgo(l.lastTouchAt)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Tablet/desktop: table */}
      <div className="mt-6 hidden overflow-hidden rounded-xl border border-navy-100 bg-white shadow-soft md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-navy-100 bg-cloud text-xs uppercase tracking-wide text-slate">
            <tr>
              <th className="px-5 py-3 font-medium">Lead</th>
              <th className="px-5 py-3 font-medium">Interest</th>
              <th className="px-5 py-3 font-medium">Score</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Last touch</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {mockLeads.map((l) => (
              <tr key={l.id} className="cursor-pointer hover:bg-cloud">
                <td className="px-5 py-3">
                  <Link href={`/leads/${l.id}`} className="block">
                    <p className="font-medium text-navy-900">{l.fullName}</p>
                    <p className="text-xs text-slate">{l.phone}</p>
                  </Link>
                </td>
                <td className="px-5 py-3 text-navy-800">
                  {l.vehicleInterest ?? <span className="text-slate">—</span>}
                  <p className="text-xs uppercase tracking-wide text-slate">{l.intent}</p>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-pill bg-mist">
                      <div className="h-full bg-cyan-500" style={{ width: `${l.score}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-navy-800">{l.score}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <LeadStatusPill status={l.status} />
                </td>
                <td className="px-5 py-3 text-xs text-slate">{timeAgo(l.lastTouchAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
