import { mockAppointments } from "@agentdynamics/types/mock";
import type { Appointment } from "@agentdynamics/types";

const typeStyle: Record<Appointment["type"], string> = {
  test_drive: "bg-cyan-50 text-cyan-700 ring-cyan-100",
  service: "bg-amber-50 text-amber-700 ring-amber-100",
  consultation: "bg-violet-50 text-violet-700 ring-violet-100",
};

const typeLabel: Record<Appointment["type"], string> = {
  test_drive: "Test drive",
  service: "Service",
  consultation: "Consultation",
};

function weekDates(anchor = new Date("2026-05-10T00:00:00Z")): Date[] {
  const start = new Date(anchor);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay() + 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    return d;
  });
}

function fmtDay(d: Date): { dow: string; date: string } {
  return {
    dow: d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
  };
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function sameUTCDate(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

export default function AppointmentsPage() {
  const days = weekDates();
  const appts = mockAppointments;

  return (
    <main className="p-6 pb-20">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-navy-900">Appointments</h1>
          <p className="mt-1 text-sm text-slate">
            Week of {days[0]!.toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" })}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate">
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-cyan-500" /> Test drive</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-amber-500" /> Service</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-violet-500" /> Consultation</span>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-7">
        {days.map((d) => {
          const today = sameUTCDate(d, new Date("2026-05-10T00:00:00Z"));
          const dayAppts = appts.filter((a) => sameUTCDate(new Date(a.scheduledAt), d));
          const { dow, date } = fmtDay(d);
          return (
            <div
              key={d.toISOString()}
              className={`rounded-xl border bg-white p-3 shadow-soft ${
                today ? "border-cyan-300 ring-1 ring-cyan-200" : "border-navy-100"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <p className="text-xs uppercase tracking-wide text-slate">{dow}</p>
                <p className={`text-sm font-semibold ${today ? "text-cyan-600" : "text-navy-900"}`}>{date}</p>
              </div>
              <div className="mt-3 space-y-2 min-h-[80px]">
                {dayAppts.length === 0 ? (
                  <p className="text-[11px] text-slate">—</p>
                ) : (
                  dayAppts.map((a) => (
                    <div key={a.id} className={`rounded-md p-2 ring-1 ${typeStyle[a.type]}`}>
                      <p className="text-[11px] font-semibold uppercase tracking-wide">
                        {fmtTime(a.scheduledAt)} · {typeLabel[a.type]}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-navy-900">{a.leadName}</p>
                      {a.notes ? (
                        <p className="mt-1 text-xs text-navy-700 line-clamp-2">{a.notes}</p>
                      ) : null}
                      {a.bookedByAi ? (
                        <p className="mt-1 text-[10px] uppercase tracking-wide text-slate">Booked by AI</p>
                      ) : null}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
