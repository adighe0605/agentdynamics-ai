import { mockVehicles } from "@agentdynamics/types/mock";
import type { Vehicle } from "@agentdynamics/types";

const statusStyle: Record<Vehicle["status"], string> = {
  available: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  reserved: "bg-amber-50 text-amber-700 ring-amber-100",
  in_transit: "bg-cyan-50 text-cyan-700 ring-cyan-100",
  sold: "bg-slate-100 text-slate-600 ring-slate-200",
};

const conditionStyle: Record<Vehicle["condition"], string> = {
  new: "text-emerald-700",
  used: "text-slate",
  certified: "text-cyan-700",
};

function fmtPrice(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function InventoryPage() {
  const counts: { total: number; available: number; reserved: number; in_transit: number; sold: number } = {
    total: mockVehicles.length,
    available: 0,
    reserved: 0,
    in_transit: 0,
    sold: 0,
  };
  for (const v of mockVehicles) counts[v.status]++;

  return (
    <main className="p-6 pb-20">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-navy-900">Inventory</h1>
          <p className="mt-1 text-sm text-slate">
            {counts.total} vehicles on the lot. The AI Employee references this list when callers ask about availability.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-pill bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 ring-1 ring-emerald-100">
            {counts.available} available
          </span>
          <span className="rounded-pill bg-amber-50 px-2.5 py-1 font-medium text-amber-700 ring-1 ring-amber-100">
            {counts.reserved} reserved
          </span>
          <span className="rounded-pill bg-cyan-50 px-2.5 py-1 font-medium text-cyan-700 ring-1 ring-cyan-100">
            {counts.in_transit} in transit
          </span>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mockVehicles.map((v) => (
          <article key={v.id} className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
            <header className="flex items-start justify-between gap-3">
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-wide ${conditionStyle[v.condition]}`}>
                  {v.condition}
                </p>
                <h3 className="mt-1 text-base font-semibold text-navy-900">
                  {v.year} {v.make} {v.model}
                </h3>
                <p className="text-xs text-slate">{v.trim} · {v.exteriorColor}</p>
              </div>
              <span className={`rounded-pill px-2.5 py-1 text-[11px] font-medium ring-1 ${statusStyle[v.status]}`}>
                {v.status.replace(/_/g, " ")}
              </span>
            </header>
            <div className="mt-4 flex items-baseline justify-between">
              <p className="text-xl font-semibold tracking-tight text-navy-900">{fmtPrice(v.price)}</p>
              {v.mileage ? (
                <p className="text-xs text-slate">{v.mileage.toLocaleString()} mi</p>
              ) : null}
            </div>
            <p className="mt-3 font-mono text-[11px] text-slate">VIN {v.vin}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
