"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  IconOverview,
  IconLive,
  IconLeads,
  IconCalendar,
  IconCallHistory,
  IconInventory,
  IconAssistant,
  IconCodebase,
  IconMore,
} from "./icons";

const PRIMARY = [
  { href: "/dashboard",    label: "Overview", Icon: IconOverview },
  { href: "/live",         label: "Live",     Icon: IconLive },
  { href: "/leads",        label: "Leads",    Icon: IconLeads },
  { href: "/appointments", label: "Appts",    Icon: IconCalendar },
] as const;

const SECONDARY = [
  { href: "/calls",     label: "Call History", Icon: IconCallHistory },
  { href: "/inventory", label: "Inventory",    Icon: IconInventory },
  { href: "/assistant", label: "AI Assistant", Icon: IconAssistant },
  { href: "/codebase",  label: "Codebase",     Icon: IconCodebase },
] as const;

export function MobileNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname?.startsWith(href) ?? false;
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-navy-100 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
          aria-label="AgentDynamics home"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-navy-900">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 3 L21 20 L15 20 L12 14 L9 20 L3 20 Z" fill="#FFFFFF" />
            </svg>
          </span>
          <span className="text-sm font-semibold tracking-tight text-navy-900">
            AgentDynamics
          </span>
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          AI online
        </span>
      </header>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-navy-100 bg-white/95 backdrop-blur lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {PRIMARY.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-semibold transition-colors focus-visible:outline-none focus-visible:bg-mist ${
                active ? "text-cyan-700" : "text-navy-600 active:bg-mist"
              }`}
            >
              <item.Icon className={active ? "text-cyan-600" : "text-navy-500"} />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMoreOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={moreOpen}
          className="flex cursor-pointer flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-semibold text-navy-600 transition-colors active:bg-mist focus-visible:outline-none focus-visible:bg-mist"
        >
          <IconMore className="text-navy-500" />
          More
        </button>
      </nav>

      {moreOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="More navigation"
          className="fixed inset-0 z-40 bg-navy-900/40 lg:hidden"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white p-4 pb-8"
            style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-navy-100" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">More</p>
            <ul className="mt-2 divide-y divide-navy-100">
              {SECONDARY.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 px-1 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:bg-mist ${
                        active ? "text-cyan-700" : "text-navy-800 active:bg-mist"
                      }`}
                    >
                      <item.Icon className={active ? "text-cyan-600" : "text-navy-500"} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-center text-[11px] text-slate">
              Developed by <span className="font-semibold text-navy-800">Akshay Dighe</span>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
