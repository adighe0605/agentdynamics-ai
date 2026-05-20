"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? "border-b border-navy-100 bg-white/85 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="ad-section flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
          aria-label="AgentDynamics home"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M12 3 L21 20 L15 20 L12 14 L9 20 L3 20 Z" fill="#061428" />
          </svg>
          <span className="text-base font-semibold tracking-tight text-navy-900">
            AgentDynamics
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-mist hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/dashboard"
            className="rounded-md px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
          >
            Sign in
          </Link>
          <a href="#demo" className="ad-btn-primary">
            Book a demo
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-700 transition-colors hover:bg-mist md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-navy-100 bg-white md:hidden"
        >
          <nav className="ad-section flex flex-col gap-1 py-3" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-navy-800 transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 pt-2">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="ad-btn-ghost w-full justify-center"
              >
                Sign in
              </Link>
              <a
                href="#demo"
                onClick={() => setOpen(false)}
                className="ad-btn-primary w-full justify-center"
              >
                Book a demo
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
