const STATS = [
  {
    value: "78%",
    label: "of after-hours leads go unanswered",
    sub: "And 60% of those buyers never call back.",
  },
  {
    value: "$340",
    label: "lost gross profit per missed lead",
    sub: "Multiply by 30+ missed calls a week.",
  },
  {
    value: "47%",
    label: "of buyers go to the first dealer who answers",
    sub: "Speed-to-lead is now the #1 conversion lever.",
  },
];

export function Problem() {
  return (
    <section className="py-20 sm:py-24">
      <div className="ad-section">
        <div className="mx-auto max-w-3xl text-center">
          <p className="ad-eyebrow">The problem</p>
          <h2 className="ad-h2 mt-3">
            Your phones are ringing. Nobody's picking up.
          </h2>
          <p className="ad-subtle mt-4">
            Every night, weekend, and lunch break, qualified buyers call your
            dealership and reach voicemail. They don't leave a message. They go
            to a competitor.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STATS.map((stat) => (
            <article
              key={stat.value}
              className="ad-card ad-card-hover relative overflow-hidden p-7"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-50 opacity-60 blur-2xl" aria-hidden />
              <div className="relative">
                <div className="text-5xl font-semibold tracking-tight text-navy-900">
                  {stat.value}
                </div>
                <h3 className="mt-3 text-base font-semibold text-navy-800">
                  {stat.label}
                </h3>
                <p className="mt-2 text-sm text-slate">{stat.sub}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
