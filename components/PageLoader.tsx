"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Full-screen splash shown before the site is ready.
 * - Only the logo + a minimal loading indicator (no copy, per brief).
 * - Waits for `window.load` (fonts/images settled) but enforces a small
 *   minimum display time so it never looks like a flicker on fast loads,
 *   and a safety fallback in case `load` is delayed.
 * - Locks body scroll while visible; releases cleanly on exit.
 * - Respects prefers-reduced-motion (shorter, simpler transitions).
 */
export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    const minDuration = reducedMotion ? 450 : 1350;
    const start = performance.now();
    let finished = false;
    let fallbackId: number;

    const finish = () => {
      if (finished) return;
      finished = true;
      const elapsed = performance.now() - start;
      const remaining = Math.max(minDuration - elapsed, 0);
      window.setTimeout(() => setVisible(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }
    // Safety net in case the load event never fires.
    fallbackId = window.setTimeout(finish, 4000);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(fallbackId);
    };
  }, [reducedMotion]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading SriZen Group"
          className="fixed inset-0 z-[3000] flex flex-col items-center justify-center bg-navy-deep overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: reducedMotion ? 0.2 : 0.7, ease: [0.16, 0.84, 0.24, 1] },
          }}
        >
          {/* Faint technical grid, echoing the hero, for brand consistency */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,.06) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse at 50% 50%, black, transparent 70%)",
            }}
          />

          {/* Soft glow behind the mark */}
          <div className="absolute w-[420px] h-[420px] rounded-full bg-cyan/10 blur-[90px]" />

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.9, ease: [0.16, 0.84, 0.24, 1] }}
          >
            <Image
              src="/assets/srizen-logo.png"
              alt="SriZen Group"
              width={220}
              height={54}
              priority
              className="h-9 sm:h-11 w-auto brightness-0 invert"
            />
          </motion.div>

          {/* Minimal indeterminate loading indicator */}
          <div className="relative mt-10 w-[130px] h-[2px] rounded-full bg-white/10 overflow-hidden">
            {reducedMotion ? (
              <motion.div
                className="h-full w-full bg-cyan/70"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : (
              <motion.div
                className="h-full w-1/3 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #00FFFF 50%, transparent)",
                }}
                animate={{ x: ["-120%", "220%"] }}
                transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
