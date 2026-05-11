import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-brand-glow" aria-hidden />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <span className="ad-pill bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
          AgentDynamics Dealer Portal
        </span>
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl">
          Drive more revenue with an AI Employee built for Automotive.
        </h1>
        <p className="mt-4 max-w-xl text-balance text-slate text-base sm:text-lg">
          Sign in to monitor live calls, track hot leads, and review appointments your
          AI Employee booked overnight.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/dashboard" className="ad-btn-primary">
            Open Dashboard
          </Link>
          <a
            href="https://agentdynamics.ai"
            className="ad-btn-ghost"
            target="_blank"
            rel="noreferrer"
          >
            Visit agentdynamics.ai
          </a>
        </div>
      </div>
    </main>
  );
}
