"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  ArrowRight,
  Users,
  ShieldCheck,
  Leaf,
  Award,
  Building2,
  MapPin,
  Home,
  Sparkles,
} from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const stats: StatItem[] = [
    { value: "240+", label: "Projects Completed", icon: <Building2 className="w-4 h-4" /> },
    { value: "26", label: "Cities", icon: <MapPin className="w-4 h-4" /> },
    { value: "15+", label: "Years Experience", icon: <Award className="w-4 h-4" /> },
    { value: "5000+", label: "Happy Families", icon: <Home className="w-4 h-4" /> },
  ];

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer First",
      description: "Every decision we make is guided by our commitment to client satisfaction and long-term relationships.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Quality Assured",
      description: "Uncompromising quality standards across every project, from foundation to finishing.",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sustainable Living",
      description: "Integrating green building practices and sustainable design for future-ready communities.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-8 md:py-20 overflow-hidden"
    >
      {/* Premium Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }} />
      </div>

      {/* Glow Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 xl:gap-24 items-start"
        >
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="w-10 h-px bg-primary" />
              <span className="text-[13px] tracking-[0.25em] uppercase font-medium text-primary">
                About SriZen Group
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2 variants={itemVariants} className="text-[38px] sm:text-[44px] lg:text-[52px] xl:text-[58px] leading-[1.05] font-light tracking-tight text-foreground">
              Precision engineering,
              <br />
              <span className="relative inline-block">
                built on trust
                <motion.span
                  className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </motion.h2>

            {/* Story */}
            <motion.p variants={itemVariants} className="text-[16px] lg:text-[17px] leading-relaxed text-muted-foreground max-w-[520px]">
              For nearly two decades, SriZen Group has partnered with governments, developers, and
              enterprises to deliver construction and infrastructure projects that stand the test of
              time — engineered with rigor, built with care, and delivered on schedule.
            </motion.p>

            {/* Feature Cards */}
            <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-4 pt-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group p-5 rounded-2xl bg-background/30 backdrop-blur-sm border border-border/40 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-1"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-1.5">
                    {feature.title}
                  </h4>
                  <p className="text-[12px] leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Image with Floating Cards */}
          <motion.div
            variants={itemVariants}
            className="relative lg:mt-8"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                className="relative rounded-[32px] overflow-hidden aspect-[4/5] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/images/miorah-villas.jpeg"
                  alt="Luxury villa architectural design"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                
                {/* Decorative accent overlay */}
                <div className="absolute top-6 right-6 w-20 h-20 border border-white/10 rounded-full" />
                <div className="absolute bottom-6 left-6 w-32 h-32 border border-white/5 rounded-full" />
              </motion.div>

              {/* Floating Card 1 - Years of Excellence */}
              <motion.div
                className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] max-w-[180px]"
                animate={floatAnimation}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-[10px] tracking-wider uppercase font-medium text-muted-foreground">
                    Excellence
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground">18+</div>
                <div className="text-[11px] text-muted-foreground leading-tight">
                  Years delivering landmark developments
                </div>
              </motion.div>

              {/* Floating Card 2 - Quality Badge */}
              <motion.div
                className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]"
                animate={{
                  y: [0, -8, 0],
                  transition: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  },
                }}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-foreground">Quality Assured</div>
                    <div className="text-[9px] text-muted-foreground tracking-wider uppercase">ISO Certified</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 3 - Trust Badge */}
              <motion.div
                className="absolute bottom-20 -right-4 sm:bottom-24 sm:-right-6 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]"
                animate={{
                  y: [0, -6, 0],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-foreground">Trusted Builder</div>
                    <div className="text-[9px] text-muted-foreground tracking-wider uppercase">5000+ Families</div>
                  </div>
                </div>
              </motion.div>

              {/* Sparkle decorative element */}
              <motion.div
                className="absolute top-1/3 -right-8 text-primary/20"
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <Sparkles className="w-12 h-12" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}