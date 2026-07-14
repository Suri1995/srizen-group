// components/about/StatCard.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
  /** Entrance stagger delay, in seconds */
  delay?: number;
  /** Offsets the ambient float loop so cards don't bob in unison */
  floatDelay?: number;
}

export default function StatCard({ value, label, className = "", delay = 0, floatDelay = 0 }: StatCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    // Outer element: one-time entrance reveal (fade + rise + blur-in),
    // triggered once when scrolled into view.
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 0.84, 0.24, 1] }}
      className={className}
    >
      {/* Inner element: the continuous ambient float — kept on a
          separate node from the entrance animation above, so the two
          don't end up fighting over the same `y` property. Suppressed
          entirely (not just slowed) under prefers-reduced-motion, since
          an infinitely-looping bob is exactly the kind of motion that
          preference exists to remove. */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={reduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
        className="rounded-md border border-[#C8A96A]/25 bg-white/85 px-6 py-5 shadow-[0_20px_45px_-20px_rgba(28,28,28,0.25)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_28px_60px_-20px_rgba(200,169,106,0.35)]"
      >
        <div className="font-display text-[28px] font-bold leading-none text-[#1C1C1C]">{value}</div>
        <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#6B6B6B]">
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
}