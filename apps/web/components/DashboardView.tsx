"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getDashboardSnapshot, DEALERSHIP_NAME } from "@agentdynamics/types/mock";
import type { PeriodKey } from "@agentdynamics/types";

const PIE_COLORS = [
  "#2563EB", // Carfax blue
  "#10B981", // Autotrader green
  "#F59E0B", // Cargurus orange
  "#EF4444", // Dealer.com red
  "#8B5CF6", // Cars.com purple
  "#06B6D4", // NissanUSA cyan
  "#84CC16", // Intelliprice lime
  "#EAB308", // BuyAtHome yellow
];

const PERIODS: { key: PeriodKey; label: string }[] = [
  { key: "7d", label: "Last 7 Days" },
  { key: "30d", label: "Last 30 Days" },
  { key: "90d", label: "Last 90 Days" },
];

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function delta(n: number): { text: string; positive: boolean } {
  const positive = n >= 0;
  return { text: `${positive ? "+" : ""}${(n * 100).toFixed(1)}% from last period`, positive };
}

function fmtMonthDay(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

function rangeLabel(volume: Array<{ date: string }>): string {
  if (volume.length === 0) return "";
  const first = volume[0]!.date;
  const last = volume[volume.length - 1]!.date;
  return `${fmtMonthDay(first)} - ${fmtMonthDay(last)}`;
}

function KpiCard({
  label,
  value,
  deltaValue,
  icon,
}: {
  label: string;
  value: string;
  deltaValue: number;
  icon: React.ReactNode;
}) {
  const d = delta(deltaValue);
  return (
    <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate">{label}</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-navy-900">
            {value}
          </p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-50 text-cyan-600">
          {icon}
        </div>
      </div>
      <p className={`mt-3 text-xs font-medium ${d.positive ? "text-emerald-600" : "text-rose-600"}`}>
        {d.text}
      </p>
    </div>
  );
}

const IconPhone = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
  </svg>
);
const IconCalendar = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconUsers = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconTrend = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

export function DashboardView() {
  const [period, setPeriod] = useState<PeriodKey>("90d");
  const snap = useMemo(() => getDashboardSnapshot(period), [period]);
  const range = rangeLabel(snap.dailyCallVolume);

  return (
    <main className="p-6 pb-20">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-navy-900">
            {DEALERSHIP_NAME}
          </h1>
          <p className="mt-1 text-sm text-slate">
            Welcome back! Here&apos;s what&apos;s happening with your Voice AI leads.
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-navy-100 bg-white p-1 shadow-soft">
          {PERIODS.map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                period === p.key
                  ? "bg-navy-900 text-white"
                  : "text-navy-700 hover:bg-mist"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Calls" value={snap.totalCalls.toLocaleString()} deltaValue={snap.deltas.calls} icon={IconPhone} />
        <KpiCard label="Appointments" value={snap.totalAppointments.toLocaleString()} deltaValue={snap.deltas.appointments} icon={IconCalendar} />
        <KpiCard label="Total Leads" value={snap.totalLeads.toLocaleString()} deltaValue={snap.deltas.leads} icon={IconUsers} />
        <KpiCard label="Conversion Rate" value={pct(snap.conversionRate)} deltaValue={snap.deltas.conversion} icon={IconTrend} />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-navy-900">Daily Call Volume</h2>
            <span className="text-xs text-slate">{range}</span>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={snap.dailyCallVolume.map((d) => ({ ...d, label: fmtMonthDay(d.date) }))} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#E1E8F2" strokeDasharray="3 3" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#475569" }}
                  tickLine={false}
                  axisLine={{ stroke: "#E1E8F2" }}
                  interval={Math.max(0, Math.floor(snap.dailyCallVolume.length / 10) - 1)}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#475569" }}
                  tickLine={false}
                  axisLine={false}
                  width={36}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E1E8F2",
                    boxShadow: "0 4px 12px rgba(10,31,61,0.08)",
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#0F172A", fontWeight: 600 }}
                  formatter={(v: number) => [`${v} calls`, "Volume"]}
                />
                <Line
                  type="monotone"
                  dataKey="calls"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ r: 2.5, fill: "#2563EB", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#2563EB", stroke: "#FFFFFF", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-navy-900">Lead Source Breakdown</h2>
            <span className="text-xs text-slate">{range}</span>
          </div>
          <div className="mt-2 flex items-center gap-6">
            <div className="h-56 w-56 shrink-0">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={snap.leadSourceBreakdown}
                    dataKey="share"
                    nameKey="label"
                    innerRadius={0}
                    outerRadius={88}
                    paddingAngle={1}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                  >
                    {snap.leadSourceBreakdown.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #E1E8F2",
                      boxShadow: "0 4px 12px rgba(10,31,61,0.08)",
                      fontSize: 12,
                    }}
                    formatter={(v: number, name) => [`${(v * 100).toFixed(0)}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex-1 space-y-2">
              {snap.leadSourceBreakdown.map((s, i) => (
                <li key={s.source} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    <span className="text-navy-800">{s.label}</span>
                  </span>
                  <span className="font-semibold text-navy-900">
                    {(s.share * 100).toFixed(0)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
