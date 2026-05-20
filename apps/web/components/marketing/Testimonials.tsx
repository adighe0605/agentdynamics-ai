const TESTIMONIALS = [
  {
    quote:
      "We hadn't realized how many leads we were losing after 7pm. AgentDynamics booked 41 test drives in its first month — and we closed 17.",
    name: "Marcus Halverson",
    role: "GM, Westgate Toyota",
    result: "+$340k Q3 service revenue",
  },
  {
    quote:
      "Our BDC team finally focuses on closing instead of answering phones. The hand-off summaries are better than the notes my reps were taking.",
    name: "Priya Nair",
    role: "Director of Sales, Bayshore Auto Group",
    result: "3.2× appointment volume",
  },
  {
    quote:
      "Setup took eight days. By day fifteen the AI had answered 600 calls and we hadn't missed one. That's not a feature — that's a different business.",
    name: "Wes Brooks",
    role: "Owner, Northern Lights Ford",
    result: "100% after-hours coverage",
  },
];

export function Testimonials() {
  return (
    <section className="bg-navy-900 py-20 sm:py-24">
      <div className="ad-section">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
            Dealer stories
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Real revenue, in the first 30 days.
          </h2>
          <p className="mt-4 text-lg text-navy-200">
            Stop guessing how many leads you're missing. Start counting how many you closed.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col justify-between rounded-xl border border-navy-700 bg-navy-800/60 p-7 backdrop-blur transition-colors hover:border-cyan-400/40"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="text-cyan-300"
              >
                <path
                  d="M7 7h4v4H7c0 3 1 4 3 5l-1 2c-3-1-5-3-5-7V7zm10 0h4v4h-4c0 3 1 4 3 5l-1 2c-3-1-5-3-5-7V7z"
                  fill="currentColor"
                />
              </svg>
              <blockquote className="mt-4 text-base leading-relaxed text-white">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-navy-700 pt-4">
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-xs text-navy-300">{t.role}</div>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-pill bg-cyan-500/15 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {t.result}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
