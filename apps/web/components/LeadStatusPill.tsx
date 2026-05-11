import type { LeadStatus } from "@agentdynamics/types";

const styles: Record<LeadStatus, string> = {
  new: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100",
  qualifying: "bg-navy-50 text-navy-700 ring-1 ring-navy-100",
  appointment_booked: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  handed_off: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  won: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200",
  lost: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};

const labels: Record<LeadStatus, string> = {
  new: "New",
  qualifying: "Qualifying",
  appointment_booked: "Appt booked",
  handed_off: "Handoff",
  won: "Won",
  lost: "Lost",
};

export function LeadStatusPill({ status }: { status: LeadStatus }) {
  return <span className={`ad-pill ${styles[status]}`}>{labels[status]}</span>;
}
