export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-navy-100 bg-white/80 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-navy-900">{title}</h1>
        {subtitle ? <p className="text-sm text-slate">{subtitle}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <button className="ad-btn-ghost" aria-label="Notifications">◔</button>
        <div className="h-8 w-8 rounded-full bg-brand-hero" aria-label="User avatar" />
      </div>
    </header>
  );
}
