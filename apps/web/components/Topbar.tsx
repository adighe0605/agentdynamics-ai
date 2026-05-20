import { IconBell } from "./icons";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-navy-100 bg-white/80 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-navy-900">{title}</h1>
        {subtitle ? <p className="text-sm text-slate">{subtitle}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-md text-navy-700 transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
          aria-label="Notifications"
        >
          <IconBell />
        </button>
        <div
          className="h-9 w-9 rounded-full bg-brand-hero ring-2 ring-white"
          aria-label="User avatar"
          role="img"
        />
      </div>
    </header>
  );
}
