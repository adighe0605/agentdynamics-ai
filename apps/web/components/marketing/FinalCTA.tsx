export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 0%, rgba(0,181,226,0.25) 0%, rgba(6,20,40,0) 70%)",
        }}
      />
      <div className="ad-section">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Tomorrow, every call gets answered.
          </h2>
          <p className="mt-5 text-lg text-navy-200">
            Book a 15-minute demo. We'll show you the last 30 nights of calls
            your store missed — and how much they were worth.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#demo" className="ad-btn-primary text-base">
              Book a 15-min demo
            </a>
            <a
              href="https://agentdynamics.ai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-navy-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
            >
              Visit agentdynamics.ai
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
