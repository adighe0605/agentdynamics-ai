const LOGOS = [
  "Westgate Toyota",
  "Bayshore Auto Group",
  "Northern Lights Ford",
  "Continental Honda",
  "Summit Chevrolet",
  "Lakeside Mazda",
];

export function LogoStrip() {
  return (
    <section aria-label="Trusted by" className="border-y border-navy-100 bg-white py-10">
      <div className="ad-section">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate">
          Trusted by dealers across North America
        </p>
        <ul className="mt-6 grid grid-cols-2 items-center gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {LOGOS.map((name) => (
            <li
              key={name}
              className="flex items-center justify-center text-center text-sm font-semibold uppercase tracking-wider text-navy-300 transition-colors hover:text-navy-700"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
