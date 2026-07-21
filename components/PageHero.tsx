"use client";

import Link from "next/link";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  crumb: string;
  stats?: {
    value: string;
    label: string;
  }[];
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  crumb,
  stats = [
    { value: "20+", label: "Years of Excellence" },
    { value: "320+", label: "Team Strength" },
    { value: "26", label: "Cities" },
  ],
}: PageHeroProps) {
  const titleParts = title.split("of");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const svgVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const svgItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.6 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="relative flex min-h-[480px] items-end overflow-hidden pb-12 pt-32 lg:min-h-[560px] lg:pb-16">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(0,7,46,.97) 0%, rgba(0,7,46,.92) 40%, rgba(0,7,46,.85) 100%), url('${image}') center/cover`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)" }}
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute right-0 top-0 h-full w-1/2 glow-pulse"
        style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(6,182,212,0.08) 0%, transparent 70%)" }}
      />

      <div className="wrap relative z-[1] mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column — Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            <motion.div variants={itemVariants} className="breadcrumb flex items-center gap-2 text-[12px] font-medium uppercase tracking-wider text-white/60">
              <Link href="/" className="transition-colors duration-300 hover:text-cyan-400">
                Home
              </Link>
              <ChevronRight size={12} className="text-white/40" />
              <span className="text-white/80">{crumb}</span>
            </motion.div>

            <motion.div variants={itemVariants} className="eyebrow-container flex items-center gap-4">
              <div className="h-px w-8 bg-emerald-200" />
              <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                {eyebrow}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="title-animated max-w-[14ch] text-[40px] font-bold leading-[1.08] tracking-tight text-white sm:text-[48px] lg:text-[56px] xl:text-[64px]">
              {titleParts.length > 1 ? (
                <>
                  {titleParts[0]}
                  <span className="text-cyan-300"> of</span>
                  <span className="relative ml-2 inline-block">
                    <span className="text-cyan-300">{titleParts[1]}</span>
                  </span>
                </>
              ) : (
                title
              )}
            </motion.h1>

            {subtitle && (
              <motion.p variants={itemVariants} className="subtitle-animated max-w-[520px] text-[16px] font-normal leading-relaxed text-white/90 lg:text-[18px]">
                {subtitle}
              </motion.p>
            )}

            <motion.div variants={itemVariants} className="flex justify-center md:justify-start pt-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-8 py-3.5 text-[14px] font-semibold tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(6,182,212,.4)]"
              >
                Get a Quote
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column — Animated Construction Scene */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="stats-container hidden lg:block"
          >
            <div className="relative mx-auto max-w-[420px]">
              <motion.div
                variants={svgVariants}
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-[80px]"
                />

                <motion.svg
                  viewBox="0 0 400 300"
                  className="relative h-auto w-full"
                  aria-hidden="true"
                  initial="hidden"
                  animate="visible"
                  variants={svgVariants}
                >
                  <defs>
                    <linearGradient id="heroGlow" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Ground line with animated dash */}
                  <motion.line
                    x1="20"
                    y1="250"
                    x2="380"
                    y2="250"
                    stroke="#22d3ee"
                    strokeOpacity="0.25"
                    strokeWidth="1.5"
                    strokeDasharray="8 8"
                    initial={{ strokeDashoffset: 360 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Villas behind the gate */}
                  <motion.g variants={svgItemVariants}>
                    {/* Villa 1 */}
                    <motion.rect
                      x="55"
                      y="150"
                      width="60"
                      height="100"
                      stroke="#22d3ee"
                      strokeOpacity="0.5"
                      strokeWidth="1.4"
                      fill="none"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <motion.rect
                      x="45"
                      y="132"
                      width="80"
                      height="18"
                      stroke="#22d3ee"
                      strokeOpacity="0.5"
                      strokeWidth="1.4"
                      fill="none"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    />
                    
                    {/* Villa 2 */}
                    <motion.rect
                      x="285"
                      y="140"
                      width="65"
                      height="110"
                      stroke="#22d3ee"
                      strokeOpacity="0.5"
                      strokeWidth="1.4"
                      fill="none"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    />
                    <motion.rect
                      x="275"
                      y="120"
                      width="85"
                      height="20"
                      stroke="#22d3ee"
                      strokeOpacity="0.5"
                      strokeWidth="1.4"
                      fill="none"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    />
                  </motion.g>

                  {/* Windows with pulse */}
                  <motion.g
                    fill="#22d3ee"
                    fillOpacity="0.35"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <motion.rect
                      x="68"
                      y="175"
                      width="12"
                      height="14"
                      animate={{ fillOpacity: [0.35, 0.6, 0.35] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.rect
                      x="90"
                      y="175"
                      width="12"
                      height="14"
                      animate={{ fillOpacity: [0.35, 0.6, 0.35] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    <motion.rect
                      x="300"
                      y="165"
                      width="12"
                      height="14"
                      animate={{ fillOpacity: [0.35, 0.6, 0.35] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                    />
                    <motion.rect
                      x="322"
                      y="165"
                      width="12"
                      height="14"
                      animate={{ fillOpacity: [0.35, 0.6, 0.35] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                    />
                  </motion.g>

                  {/* Construction Crane with realistic movement */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    {/* Crane tower */}
                    <motion.line
                      x1="345"
                      y1="250"
                      x2="345"
                      y2="70"
                      stroke="#7dd3fc"
                      strokeOpacity="0.45"
                      strokeWidth="1.8"
                    />
                    
                    {/* Crane tower cross braces (detail) */}
                    <motion.line
                      x1="340"
                      y1="150"
                      x2="350"
                      y2="160"
                      stroke="#7dd3fc"
                      strokeOpacity="0.2"
                      strokeWidth="0.8"
                    />
                    <motion.line
                      x1="340"
                      y1="160"
                      x2="350"
                      y2="150"
                      stroke="#7dd3fc"
                      strokeOpacity="0.2"
                      strokeWidth="0.8"
                    />
                    <motion.line
                      x1="340"
                      y1="120"
                      x2="350"
                      y2="130"
                      stroke="#7dd3fc"
                      strokeOpacity="0.2"
                      strokeWidth="0.8"
                    />
                    <motion.line
                      x1="340"
                      y1="130"
                      x2="350"
                      y2="120"
                      stroke="#7dd3fc"
                      strokeOpacity="0.2"
                      strokeWidth="0.8"
                    />

                    {/* Crane boom (horizontal arm) - rotates */}
                    <motion.g
                      animate={{ 
                        rotate: [0, 3, 0, -3, 0, 2, -2, 0] 
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      style={{ transformOrigin: "345px 78px" }}
                    >
                      {/* Main boom */}
                      <motion.line
                        x1="345"
                        y1="78"
                        x2="230"
                        y2="98"
                        stroke="#7dd3fc"
                        strokeOpacity="0.6"
                        strokeWidth="1.8"
                      />
                      
                      {/* Boom lattice detail */}
                      <motion.line
                        x1="320"
                        y1="84"
                        x2="310"
                        y2="88"
                        stroke="#7dd3fc"
                        strokeOpacity="0.2"
                        strokeWidth="0.8"
                      />
                      <motion.line
                        x1="295"
                        y1="89"
                        x2="285"
                        y2="93"
                        stroke="#7dd3fc"
                        strokeOpacity="0.2"
                        strokeWidth="0.8"
                      />
                      <motion.line
                        x1="270"
                        y1="94"
                        x2="260"
                        y2="98"
                        stroke="#7dd3fc"
                        strokeOpacity="0.2"
                        strokeWidth="0.8"
                      />

                      {/* Counter-jib (back arm) */}
                      <motion.line
                        x1="345"
                        y1="78"
                        x2="380"
                        y2="74"
                        stroke="#7dd3fc"
                        strokeOpacity="0.4"
                        strokeWidth="1.4"
                      />
                      
                      {/* Counter weight */}
                      <motion.rect
                        x="370"
                        y="72"
                        width="12"
                        height="8"
                        fill="#7dd3fc"
                        fillOpacity="0.3"
                        stroke="#7dd3fc"
                        strokeOpacity="0.4"
                        strokeWidth="0.8"
                      />
                    </motion.g>

                    {/* Crane cabin */}
                    <motion.rect
                      x="340"
                      y="72"
                      width="10"
                      height="8"
                      fill="#7dd3fc"
                      fillOpacity="0.2"
                      stroke="#7dd3fc"
                      strokeOpacity="0.4"
                      strokeWidth="1"
                      rx="1"
                    />

                    {/* Hoist cable - moves up and down like lifting materials */}
                    <motion.g>
                      <motion.line
                        x1="270"
                        y1="98"
                        x2="270"
                        y2="130"
                        stroke="#7dd3fc"
                        strokeOpacity="0.6"
                        strokeWidth="1.2"
                        animate={{ 
                          y2: [130, 125, 135, 128, 130, 122, 130],
                          strokeOpacity: [0.6, 0.8, 0.5, 0.7, 0.6, 0.8, 0.6]
                        }}
                        transition={{ 
                          duration: 6, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      />
                      
                      {/* Hook */}
                      <motion.path
                        d="M 270 130 Q 265 130 265 135 L 275 135 Q 275 130 270 130"
                        stroke="#7dd3fc"
                        strokeOpacity="0.6"
                        strokeWidth="1.2"
                        fill="none"
                        animate={{ 
                          y: [0, -5, 5, -2, 0, -8, 0],
                          strokeOpacity: [0.6, 0.8, 0.5, 0.7, 0.6, 0.8, 0.6]
                        }}
                        transition={{ 
                          duration: 6, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      />
                    </motion.g>

                    {/* Loading materials being lifted - appears/disappears */}
                    <motion.g
                      animate={{ 
                        opacity: [0, 1, 1, 0, 0, 1, 0],
                        y: [0, -8, -8, 0, 0, -8, 0]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    >
                      <motion.rect
                        x="263"
                        y="132"
                        width="14"
                        height="6"
                        fill="#7dd3fc"
                        fillOpacity="0.2"
                        stroke="#7dd3fc"
                        strokeOpacity="0.3"
                        strokeWidth="0.8"
                      />
                      <motion.line
                        x1="263"
                        y1="132"
                        x2="277"
                        y2="132"
                        stroke="#7dd3fc"
                        strokeOpacity="0.2"
                        strokeWidth="0.8"
                      />
                      <motion.line
                        x1="263"
                        y1="135"
                        x2="277"
                        y2="135"
                        stroke="#7dd3fc"
                        strokeOpacity="0.2"
                        strokeWidth="0.8"
                      />
                    </motion.g>
                  </motion.g>

                  {/* Entrance gate with animated path */}
                  <motion.g
                    stroke="#67e8f9"
                    strokeWidth="1.8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <line x1="150" y1="250" x2="150" y2="120" />
                    <line x1="250" y1="250" x2="250" y2="120" />
                    <motion.path
                      d="M 150 120 Q 200 90 250 120"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx="150"
                      cy="112"
                      r="3"
                      fill="#67e8f9"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.2 }}
                    />
                    <motion.circle
                      cx="250"
                      cy="112"
                      r="3"
                      fill="#67e8f9"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.3 }}
                    />
                  </motion.g>
                  
                  {/* Gate opening animation */}
                  <motion.line
                    x1="160"
                    y1="250"
                    x2="240"
                    y2="250"
                    stroke="#67e8f9"
                    strokeOpacity="0.6"
                    strokeWidth="1.4"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.6 }}
                    transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                    style={{ transformOrigin: "200px 250px" }}
                  />

                  {/* Construction site details - scaffolding */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <line
                      x1="60"
                      y1="250"
                      x2="60"
                      y2="200"
                      stroke="#22d3ee"
                      strokeOpacity="0.15"
                      strokeWidth="0.8"
                    />
                    <line
                      x1="110"
                      y1="250"
                      x2="110"
                      y2="200"
                      stroke="#22d3ee"
                      strokeOpacity="0.15"
                      strokeWidth="0.8"
                    />
                    <line
                      x1="60"
                      y1="220"
                      x2="110"
                      y2="220"
                      stroke="#22d3ee"
                      strokeOpacity="0.15"
                      strokeWidth="0.8"
                    />
                    <line
                      x1="60"
                      y1="235"
                      x2="110"
                      y2="235"
                      stroke="#22d3ee"
                      strokeOpacity="0.15"
                      strokeWidth="0.8"
                    />
                  </motion.g>

                  {/* Decorative particles - floating dust/light */}
                  <motion.circle
                    cx="180"
                    cy="180"
                    r="1.5"
                    fill="#22d3ee"
                    opacity="0.3"
                    animate={{ 
                      y: [180, 175, 180],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="220"
                    cy="160"
                    r="1"
                    fill="#22d3ee"
                    opacity="0.2"
                    animate={{ 
                      y: [160, 155, 160],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.circle
                    cx="190"
                    cy="140"
                    r="1.2"
                    fill="#22d3ee"
                    opacity="0.25"
                    animate={{ 
                      y: [140, 135, 140],
                      opacity: [0.25, 0.5, 0.25]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  />
                  <motion.circle
                    cx="210"
                    cy="195"
                    r="0.8"
                    fill="#22d3ee"
                    opacity="0.15"
                    animate={{ 
                      y: [195, 190, 195],
                      opacity: [0.15, 0.4, 0.15]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                  />
                  <motion.circle
                    cx="160"
                    cy="210"
                    r="1"
                    fill="#22d3ee"
                    opacity="0.2"
                    animate={{ 
                      y: [210, 205, 210],
                      opacity: [0.2, 0.45, 0.2]
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: 0.8 }}
                  />
                </motion.svg>
              </motion.div>

              {/* Stats with staggered animation */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {stats.map((s, index) => (
                  <motion.div
                    key={s.label}
                    custom={index}
                    variants={statVariants}
                    initial="hidden"
                    animate="visible"
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 hover:bg-white/[0.08]"
                  >
                    <motion.div
                      className="font-display text-[22px] font-bold text-white"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {s.value}
                    </motion.div>
                    <div className="mt-1 text-[9.5px] uppercase leading-tight tracking-[0.1em] text-white/50">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .glow-pulse { animation: glowPulse 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}