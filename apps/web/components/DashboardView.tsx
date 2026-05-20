"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getDashboardSnapshot,
  DEALERSHIP_NAME,
  mockLeads,
  mockAppointments,
  mockLiveCalls,
} from "@agentdynamics/types/mock";
import type { PeriodKey } from "@agentdynamics/types";
import {
  IconPhone,
  IconCalendar,
  IconLeads,
  IconTrend,
  IconArrowRight,
  IconClock,
  IconSparkle,
  IconLive,
} from "./icons";
import { LeadStatusPill } from "./LeadStatusPill";

const PIE_COLORS = [
  "#00B5E2",
  "#0091B8",
  "#162F50",
  "#3F5E8A",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
];

const PERIODS: { key: PeriodKey; label: string }[] = [
  { key: "7d", label: "7d" },
  { key: "30d", label: "30d" },
  { key: "90d", label: "90d" },
];

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function deltaText(n: number): string {
  return `${n >= 0 ? "+" : ""}${(n * 100).toFixed(1)}%`;
}

function fmtMonthDay(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function fmtAppointmentDay(iso: string): string {
  const d = new Date(iso);
  const today = new Date("2026-05-10T00:00:00Z");
  const tomorrow = new Date("2026-05-11T00:00:00Z");
  const diffDays = Math.floor((d.getTime() - today.getTime()) / 86_400_000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function rangeLabel(volume: Array<{ date: string }>): string {
  if (volume.length === 0) return "";
  return `${fmtMonthDay(volume[0]!.date)} – ${fmtMonthDay(volume[volume.length - 1]!.date)}`;
}

function todayDate(): string {
  return new Date("2026-05-10T00:00:00Z").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function callDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

function aiMinutesSaved(callsCount: number): string {
  const total = Math.round(callsCount * 6.4);
  if (total < 60) return `${total}m`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${h}h ${m}m`;
}

type KpiProps = {
  label: string;
  value: string;
  delta: number;
  trend: number[];
  Icon: (p: { className?: string; size?: number }) => React.JSX.Element;
};

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  if (data.length < 2) return null;
  const stroke = positive ? "#10B981" : "#EF4444";
  const fill = positive ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)";
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = Math.max(1, max - min);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 32 - ((v - min) / span) * 26 - 3;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const area = `0,32 ${points.join(" ")} 100,32`;
  return (
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="h-8 w-full" aria-hidden>
      <polygon points={area} fill={fill} />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function KpiCard({ label, value, delta, trend, Icon }: KpiProps) {
  const positive = delta >= 0;
  return (
    <article className="group relative overflow-hidden rounded-xl border border-navy-100 bg-white p-5 shadow-soft transition-colors hover:border-cyan-200">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
            {label}
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-navy-900">
            {value}
          </p>
        </div>
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyan-50 text-cyan-600"
          aria-hidden
        >
          <Icon size={18} />
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-[11px] font-semibold ${
            positive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d={positive ? "M6 14l6-6 6 6" : "M6 10l6 6 6-6"}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {deltaText(delta)}
        </span>
        <div className="w-24">
          <Sparkline data={trend} positive={positive} />
        </div>
      </div>
    </article>
  );
}

export function DashboardView() {
  const [period, setPeriod] = useState<PeriodKey>("90d");
  const snap = useMemo(() => getDashboardSnapshot(period), [period]);
  const range = rangeLabel(snap.dailyCallVolume);

  const volumeSeries = useMemo(
    () => snap.dailyCallVolume.map((d) => d.calls),
    [snap.dailyCallVolume],
  );
  const last14 = volumeSeries.slice(-14);
  const apptTrend = useMemo(
    () => last14.map((v, i) => Math.round(v * 0.09 + (i % 3) * 0.6)),
    [last14],
  );
  const leadsTrend = useMemo(() => last14.map((v) => Math.round(v * 0.56)), [last14]);
  const convTrend = useMemo(
    () => last14.map((_, i) => snap.conversionRate * 100 + (Math.sin(i) * 0.6)),
    [last14, snap.conversionRate],
  );

  const liveCalls = mockLiveCalls;
  const upcomingAppointments = [...mockAppointments]
    .sort((a, b) => +new Date(a.scheduledAt) - +new Date(b.scheduledAt))
    .slice(0, 4);
  const hotLeads = [...mockLeads]
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return (
    <main className="px-4 pb-24 pt-4 sm:px-6 sm:pt-6 lg:pb-20">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
            {todayDate()}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            {DEALERSHIP_NAME}
          </h1>
          <p className="mt-1 text-sm text-slate">
            Here's what your AI Employee handled while you were focused on
            closers.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div
            role="tablist"
            aria-label="Time range"
            className="inline-flex rounded-lg border border-navy-100 bg-white p-1 shadow-soft"
          >
            {PERIODS.map((p) => (
              <button
                key={p.key}
                role="tab"
                aria-selected={period === p.key}
                onClick={() => setPeriod(p.key)}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 ${
                  period === p.key
                    ? "bg-navy-900 text-white"
                    : "text-navy-700 hover:bg-mist"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <Link href="/live" className="ad-btn-primary text-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-white/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            {liveCalls.length} live now
          </Link>
        </div>
      </header>

      <section
        aria-label="Live AI activity"
        className="mt-6 overflow-hidden rounded-xl border border-navy-100 bg-gradient-to-r from-navy-900 to-navy-800 p-5 text-white shadow-soft"
      >
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white/10 text-cyan-300"
            >
              <IconSparkle size={20} />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Live
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-cyan-300">
                  AI Employee · always on
                </span>
              </div>
              <p className="mt-2 text-base font-medium leading-snug text-white">
                {liveCalls.length} active call{liveCalls.length === 1 ? "" : "s"} ·{" "}
                {snap.totalAppointments.toLocaleString()} appointments booked ·{" "}
                {aiMinutesSaved(snap.totalCalls)} of rep time saved this period.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
            <Link
              href="/live"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <IconLive size={14} />
              Listen in
            </Link>
            <Link
              href="/leads"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <IconLeads size={14} />
              Hot leads
            </Link>
            <Link
              href="/appointments"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              <IconCalendar size={14} />
              Today's appts
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-label="Key metrics"
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <KpiCard
          label="Total calls"
          value={snap.totalCalls.toLocaleString()}
          delta={snap.deltas.calls}
          trend={last14}
          Icon={IconPhone}
        />
        <KpiCard
          label="Appointments"
          value={snap.totalAppointments.toLocaleString()}
          delta={snap.deltas.appointments}
          trend={apptTrend}
          Icon={IconCalendar}
        />
        <KpiCard
          label="Total leads"
          value={snap.totalLeads.toLocaleString()}
          delta={snap.deltas.leads}
          trend={leadsTrend}
          Icon={IconLeads}
        />
        <KpiCard
          label="Conversion rate"
          value={pct(snap.conversionRate)}
          delta={snap.deltas.conversion}
          trend={convTrend}
          Icon={IconTrend}
        />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft xl:col-span-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-navy-900">Daily call volume</h2>
              <p className="mt-0.5 text-xs text-slate">{range}</p>
            </div>
            <span className="rounded-pill bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-700">
              {snap.totalCalls.toLocaleString()} calls · {pct(snap.conversionRate)} converted
            </span>
          </div>
          <div className="mt-4 h-72 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={snap.dailyCallVolume.map((d) => ({ ...d, label: fmtMonthDay(d.date) }))}
                margin={{ top: 10, right: 12, left: -8, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00B5E2" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#00B5E2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E1E8F2" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 12, fill: "#475569" }}
                  tickLine={false}
                  axisLine={{ stroke: "#E1E8F2" }}
                  interval="preserveStartEnd"
                  minTickGap={32}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#475569" }}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                  tickCount={5}
                />
                <Tooltip
                  cursor={{ stroke: "#00B5E2", strokeWidth: 1, strokeDasharray: "3 3" }}
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #E1E8F2",
                    boxShadow: "0 4px 12px rgba(10,31,61,0.08)",
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#0F172A", fontWeight: 600 }}
                  formatter={(v: number) => [`${v} calls`, "Volume"]}
                />
                <Area
                  type="monotone"
                  dataKey="calls"
                  stroke="#00B5E2"
                  strokeWidth={2.4}
                  fill="url(#callsGradient)"
                  activeDot={{ r: 5, fill: "#00B5E2", stroke: "#FFFFFF", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <div className="flex items-baseline justify-between">
            <h2 className="text-base font-semibold text-navy-900">Lead sources</h2>
            <span className="text-[11px] text-slate">{range}</span>
          </div>
          <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row xl:flex-col xl:items-stretch">
            <div className="relative h-44 w-44 shrink-0 xl:h-40 xl:w-40 xl:self-center">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={snap.leadSourceBreakdown}
                    dataKey="share"
                    nameKey="label"
                    innerRadius={48}
                    outerRadius={80}
                    paddingAngle={1.5}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                  >
                    {snap.leadSourceBreakdown.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid #E1E8F2",
                      boxShadow: "0 4px 12px rgba(10,31,61,0.08)",
                      fontSize: 12,
                    }}
                    formatter={(v: number, name) => [`${(v * 100).toFixed(0)}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-medium uppercase tracking-wider text-slate">
                  Top
                </span>
                <span className="text-sm font-semibold text-navy-900">
                  {snap.leadSourceBreakdown[0]?.label}
                </span>
                <span className="text-xs text-slate">
                  {pct(snap.leadSourceBreakdown[0]?.share ?? 0)}
                </span>
              </div>
            </div>
            <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-1.5 sm:flex-1 sm:grid-cols-1 xl:grid-cols-1">
              {snap.leadSourceBreakdown.slice(0, 6).map((s, i) => (
                <li
                  key={s.source}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                      aria-hidden
                    />
                    <span className="truncate text-navy-800">{s.label}</span>
                  </span>
                  <span className="shrink-0 font-semibold text-navy-900">
                    {(s.share * 100).toFixed(0)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="flex flex-col rounded-xl border border-navy-100 bg-white shadow-soft">
          <header className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-500/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <h2 className="text-base font-semibold text-navy-900">Live calls</h2>
              <span className="rounded-pill bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                {liveCalls.length}
              </span>
            </div>
            <Link
              href="/live"
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 hover:text-cyan-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 rounded-md px-1 py-0.5"
            >
              View all
              <IconArrowRight size={12} />
            </Link>
          </header>
          <ul className="divide-y divide-navy-100">
            {liveCalls.map((c) => {
              const startedMs = Date.now() - +new Date(c.startedAt);
              const minutes = Math.max(0, Math.floor(startedMs / 60_000));
              return (
                <li key={c.id} className="flex items-start gap-3 px-5 py-4">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-cyan-50 text-cyan-700"
                  >
                    <IconPhone size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold text-navy-900">
                        {c.leadName}
                      </p>
                      <span className="font-mono text-[11px] text-slate">
                        {minutes}m ago
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate">
                      {c.vehicleInterest ?? "General inquiry"} · {c.phone}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-pill bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-700">
                        <IconSparkle size={10} />
                        AI confidence {(c.aiConfidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
            {liveCalls.length === 0 && (
              <li className="px-5 py-10 text-center text-sm text-slate">
                No calls in progress. Your AI is on standby.
              </li>
            )}
          </ul>
        </article>

        <article className="flex flex-col rounded-xl border border-navy-100 bg-white shadow-soft">
          <header className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <IconCalendar size={16} className="text-cyan-600" />
              <h2 className="text-base font-semibold text-navy-900">Upcoming appointments</h2>
            </div>
            <Link
              href="/appointments"
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 hover:text-cyan-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 rounded-md px-1 py-0.5"
            >
              View all
              <IconArrowRight size={12} />
            </Link>
          </header>
          <ul className="divide-y divide-navy-100">
            {upcomingAppointments.map((a) => (
              <li key={a.id} className="flex items-start gap-3 px-5 py-4">
                <div
                  aria-hidden
                  className="flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-md border border-navy-100 bg-cloud"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-700">
                    {new Date(a.scheduledAt).toLocaleDateString("en-US", { month: "short" })}
                  </span>
                  <span className="text-base font-bold text-navy-900">
                    {new Date(a.scheduledAt).getDate()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-navy-900">
                      {a.leadName}
                    </p>
                    <span className="text-[11px] font-medium text-slate">
                      {fmtAppointmentDay(a.scheduledAt)} · {fmtTime(a.scheduledAt)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate">
                    {a.type === "test_drive"
                      ? "Test drive"
                      : a.type === "service"
                      ? "Service appointment"
                      : "Consultation"}{" "}
                    · {a.durationMinutes} min
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {a.bookedByAi && (
                      <span className="inline-flex items-center gap-1 rounded-pill bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-700">
                        <IconSparkle size={10} />
                        Booked by AI
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-[11px] font-semibold ${
                        a.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          a.status === "confirmed" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                        aria-hidden
                      />
                      {a.status === "confirmed" ? "Confirmed" : "Scheduled"}
                    </span>
                  </div>
                </div>
              </li>
            ))}
            {upcomingAppointments.length === 0 && (
              <li className="px-5 py-10 text-center text-sm text-slate">
                No upcoming appointments.
              </li>
            )}
          </ul>
        </article>
      </section>

      <section className="mt-6">
        <article className="rounded-xl border border-navy-100 bg-white shadow-soft">
          <header className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="grid h-7 w-7 place-items-center rounded-md bg-cyan-50 text-cyan-600"
              >
                <IconTrend size={14} />
              </span>
              <h2 className="text-base font-semibold text-navy-900">Hot leads</h2>
              <span className="rounded-pill bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-700">
                {hotLeads.length}
              </span>
            </div>
            <Link
              href="/leads"
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 hover:text-cyan-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 rounded-md px-1 py-0.5"
            >
              All leads
              <IconArrowRight size={12} />
            </Link>
          </header>

          <ul className="divide-y divide-navy-100 sm:hidden">
            {hotLeads.map((l) => (
              <li key={l.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy-900">{l.fullName}</p>
                    <p className="mt-0.5 truncate text-xs text-slate">
                      {l.vehicleInterest ?? "General"} · {l.phone}
                    </p>
                  </div>
                  <ScorePill score={l.score} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <LeadStatusPill status={l.status} />
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate">
                    <IconClock size={11} />
                    {fmtTime(l.lastTouchAt)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden sm:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-xs font-semibold uppercase tracking-[0.1em] text-slate">
                  <th className="px-5 py-3">Lead</th>
                  <th className="px-2 py-3">Interest</th>
                  <th className="px-2 py-3">Status</th>
                  <th className="px-2 py-3">Score</th>
                  <th className="px-5 py-3 text-right">Last touch</th>
                </tr>
              </thead>
              <tbody>
                {hotLeads.map((l) => (
                  <tr
                    key={l.id}
                    className="border-b border-navy-100 last:border-b-0 transition-colors hover:bg-cloud"
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/leads/${l.id}`}
                        className="font-semibold text-navy-900 hover:text-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 rounded-sm"
                      >
                        {l.fullName}
                      </Link>
                      <div className="text-xs text-slate">{l.phone}</div>
                    </td>
                    <td className="px-2 py-3 text-navy-800">
                      {l.vehicleInterest ?? <span className="text-slate">—</span>}
                    </td>
                    <td className="px-2 py-3">
                      <LeadStatusPill status={l.status} />
                    </td>
                    <td className="px-2 py-3">
                      <ScorePill score={l.score} />
                    </td>
                    <td className="px-5 py-3 text-right text-xs text-slate">
                      {fmtTime(l.lastTouchAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FootStat label="Avg call duration" value={callDuration(498)} sublabel="AI handled, voice" />
        <FootStat label="Handoff rate" value="6.4%" sublabel="Below 10% target" />
        <FootStat label="After-hours coverage" value="100%" sublabel="Last 30 days" />
      </section>
    </main>
  );
}

function ScorePill({ score }: { score: number }) {
  const tone =
    score >= 85
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : score >= 70
      ? "bg-cyan-50 text-cyan-700 ring-cyan-100"
      : "bg-amber-50 text-amber-700 ring-amber-100";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-[11px] font-semibold ring-1 ${tone}`}
    >
      <span className="font-mono">{score}</span>
      <span className="opacity-70">/100</span>
    </span>
  );
}

function FootStat({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel: string;
}) {
  return (
    <article className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-navy-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate">{sublabel}</p>
    </article>
  );
}
