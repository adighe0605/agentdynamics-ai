export function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-navy-700 bg-navy-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 text-xs text-navy-200">
        <div className="flex items-center gap-3">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M12 3 L21 20 L15 20 L12 14 L9 20 L3 20 Z" fill="#FFFFFF" />
          </svg>
          <span className="text-sm font-semibold tracking-tight text-white">
            AgentDynamics
          </span>
          <span className="h-3.5 w-px bg-navy-500" aria-hidden />
          <span className="text-navy-200">Built for automotive dealerships</span>
        </div>
        <span className="text-navy-200">
          Developed by{" "}
          <span className="font-semibold text-white">Akshay Dighe</span>
        </span>
      </div>
    </footer>
  );
}
