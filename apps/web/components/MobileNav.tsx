"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PRIMARY = [
  { href: "/dashboard",    label: "Overview", icon: "▦" },
  { href: "/live",         label: "Live",     icon: "◉" },
  { href: "/leads",        label: "Leads",    icon: "✦" },
  { href: "/appointments", label: "Appts",    icon: "▤" },
] as const;

const SECONDARY = [
  { href: "/calls",     label: "Call History", icon: "↺" },
  { href: "/inventory", label: "Inventory",    icon: "▢" },
  { href: "/assistant", label: "AI Assistant", icon: "✺" },
  { href: "/codebase",  label: "Codebase",     icon: "❮" },
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
      {/* Sticky top brand bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-navy-100 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-navy-900">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 3 L21 20 L15 20 L12 14 L9 20 L3 20 Z" fill="#FFFFFF" />
            </svg>
          </span>
          <span className="text-sm font-semibold tracking-tight text-navy-900">
            AgentDynamics
          </span>
        </Link>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          AI online
        </span>
      </header>

      {/* Bottom tab bar */}
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
              className={`flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-semibold transition ${
                active ? "text-cyan-600" : "text-navy-700 active:bg-mist"
              }`}
            >
              <span aria-hidden className={`text-lg ${active ? "" : "text-navy-500"}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-semibold text-navy-700 active:bg-mist"
        >
          <span aria-hidden className="text-lg text-navy-500">⋯</span>
          More
        </button>
      </nav>

      {/* More sheet */}
      {moreOpen ? (
        <div
          className="fixed inset-0 z-40 bg-navy-900/40 lg:hidden"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white p-4 pb-8"
            style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-navy-100" />
            <p className="text-xs uppercase tracking-wide text-slate">More</p>
            <ul className="mt-2 divide-y divide-navy-100">
              {SECONDARY.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={`flex items-center gap-3 px-1 py-3 text-sm font-medium ${
                        active ? "text-cyan-600" : "text-navy-800 active:bg-mist"
                      }`}
                    >
                      <span aria-hidden className="text-cyan-500 text-base">
                        {item.icon}
                      </span>
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
