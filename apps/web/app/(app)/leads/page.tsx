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

export default function LeadsPage() {
  return (
    <main className="p-6 pb-20">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-navy-900">Leads</h1>
          <p className="mt-1 text-sm text-slate">{mockLeads.length} active leads in the pipeline.</p>
        </div>
      </header>

      <div className="mt-6 overflow-x-auto rounded-xl border border-navy-100 bg-white shadow-soft">
        <table className="w-full min-w-[640px] text-left text-sm">
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
                <td className="px-5 py-3"><LeadStatusPill status={l.status} /></td>
                <td className="px-5 py-3 text-xs text-slate">{timeAgo(l.lastTouchAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
