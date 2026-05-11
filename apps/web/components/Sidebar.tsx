"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard",    label: "Overview",     icon: "▦" },
  { href: "/live",         label: "Live calls",   icon: "◉" },
  { href: "/leads",        label: "Leads",        icon: "✦" },
  { href: "/calls",        label: "Call history", icon: "↺" },
  { href: "/appointments", label: "Appointments", icon: "▤" },
  { href: "/inventory",    label: "Inventory",    icon: "▢" },
  { href: "/assistant",    label: "AI Assistant", icon: "✺" },
  { href: "/codebase",     label: "Codebase",     icon: "❮" },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 border-r border-navy-100 bg-white p-5 lg:flex lg:flex-col">
      <Link href="/" className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-navy-900">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 3 L21 20 L15 20 L12 14 L9 20 L3 20 Z" fill="#FFFFFF" />
          </svg>
        </span>
        <span className="text-sm font-semibold tracking-tight text-navy-900">
          AgentDynamics
        </span>
      </Link>
      <nav className="mt-8 flex flex-col gap-1">
        {nav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-cyan-50 text-cyan-700"
                  : "text-navy-700 hover:bg-mist"
              }`}
            >
              <span aria-hidden className="text-cyan-500">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-lg bg-brand-card p-4 ring-1 ring-cyan-100">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <p className="text-xs font-semibold text-navy-800">AI Employee online</p>
        </div>
        <p className="mt-1 text-xs text-slate">
          Answering 24/7 across voice, SMS, and email.
        </p>
      </div>
    </aside>
  );
}
