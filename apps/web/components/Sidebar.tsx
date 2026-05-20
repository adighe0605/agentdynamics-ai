"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconOverview,
  IconLive,
  IconLeads,
  IconCallHistory,
  IconCalendar,
  IconInventory,
  IconAssistant,
  IconCodebase,
} from "./icons";

const nav = [
  { href: "/dashboard",    label: "Overview",     Icon: IconOverview },
  { href: "/live",         label: "Live calls",   Icon: IconLive },
  { href: "/leads",        label: "Leads",        Icon: IconLeads },
  { href: "/calls",        label: "Call history", Icon: IconCallHistory },
  { href: "/appointments", label: "Appointments", Icon: IconCalendar },
  { href: "/inventory",    label: "Inventory",    Icon: IconInventory },
  { href: "/assistant",    label: "AI Assistant", Icon: IconAssistant },
  { href: "/codebase",     label: "Codebase",     Icon: IconCodebase },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 border-r border-navy-100 bg-white p-5 lg:flex lg:flex-col">
      <Link
        href="/"
        className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
        aria-label="AgentDynamics home"
      >
        <span className="grid h-8 w-8 place-items-center rounded-md bg-navy-900">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 3 L21 20 L15 20 L12 14 L9 20 L3 20 Z" fill="#FFFFFF" />
          </svg>
        </span>
        <span className="text-sm font-semibold tracking-tight text-navy-900">
          AgentDynamics
        </span>
      </Link>

      <nav className="mt-8 flex flex-col gap-0.5" aria-label="Primary">
        {nav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 ${
                active
                  ? "bg-cyan-50 text-cyan-700"
                  : "text-navy-700 hover:bg-mist hover:text-navy-900"
              }`}
            >
              {active && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-cyan-500"
                />
              )}
              <item.Icon
                className={
                  active
                    ? "text-cyan-500"
                    : "text-navy-400 transition-colors group-hover:text-navy-700"
                }
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-cyan-100 bg-gradient-to-b from-cyan-50 to-white p-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden>
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <p className="text-xs font-semibold text-navy-800">AI Employee online</p>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-slate">
          Answering 24/7 across voice, SMS, and email.
        </p>
        <Link
          href="/live"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 hover:text-cyan-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
        >
          See live calls
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
