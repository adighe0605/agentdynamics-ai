"use client";

import { motion } from "framer-motion";

export function StatCard({
  label,
  value,
  delta,
  intent = "neutral",
}: {
  label: string;
  value: string | number;
  delta?: string;
  intent?: "neutral" | "positive" | "warning";
}) {
  const tone =
    intent === "positive"
      ? "text-success"
      : intent === "warning"
      ? "text-warning"
      : "text-slate";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
      className="ad-card ad-card-hover p-5"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-navy-900">
        {value}
      </p>
      {delta ? <p className={`mt-1 text-xs font-medium ${tone}`}>{delta}</p> : null}
    </motion.div>
  );
}
