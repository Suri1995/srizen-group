"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/content";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const menuVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-premium ${
          scrolled
            ? "bg-gray-200 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px] md:h-[80px]">
          {/* Logo */}
          <Link href="/" className="shrink-0 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg">
            <Image
              src="/assets/srizen-logo.png"
              alt="SriZen Group - Home"
              width={160}
              height={40}
              className={`h-10 md:h-12 w-auto transition-all duration-500 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              if (link.label === "Miorah") {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-label="Miorah by SriZen"
                    className={`group relative flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                      scrolled
                        ? active
                          ? "bg-primary/5"
                          : "hover:bg-foreground/5"
                        : active
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <Image
                      src="/assets/miorah.png"
                      alt="Miorah by SriZen"
                      width={480}
                      height={325}
                      className="h-8 w-auto"
                    />
                    {active && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-sky-400 rounded-full" />
                    )}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-[14px] font-medium leading-none transition-all duration-300 ${
                    scrolled
                      ? active
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                      : active
                      ? "text-white bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-sky-400 rounded-full"
                      layoutId="active-indicator"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={`hidden xl:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "bg-primary text-primary-foreground hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.2)] hover:scale-[1.02]"
                  : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/10"
              }`}
            >
              Get a Quote
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="relative w-5 h-[18px]">
                <span
                  className={`absolute left-0 w-full h-[2px] rounded-full transition-all duration-300 ${
                    scrolled ? "bg-foreground" : "bg-white"
                  } ${
                    menuOpen
                      ? "top-[8px] rotate-45"
                      : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[8px] w-full h-[2px] rounded-full transition-all duration-300 ${
                    scrolled ? "bg-foreground" : "bg-white"
                  } ${
                    menuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-[2px] rounded-full transition-all duration-300 ${
                    scrolled ? "bg-foreground" : "bg-white"
                  } ${
                    menuOpen
                      ? "top-[8px] -rotate-45"
                      : "top-[16px]"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full Viewport, rendered via portal so it's never
          affected by transformed ancestors (e.g. framer-motion page
          transition wrappers) breaking `position: fixed`. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="fixed inset-0 h-[100dvh] w-screen bg-white z-[2000] lg:hidden"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex flex-col h-full">
                  {/* Menu Header with Logo and Close Button */}
                  <div className="flex items-center justify-between px-4 sm:px-6 h-[72px] md:h-[80px] border-b border-gray-100">
                    <Link href="/" onClick={() => setMenuOpen(false)}>
                      <Image
                        src="/assets/srizen-logo.png"
                        alt="SriZen Group"
                        width={160}
                        height={40}
                        className="h-10 md:h-12 w-auto"
                      />
                    </Link>

                    <button
                      aria-label="Close menu"
                      onClick={() => setMenuOpen(false)}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <X className="w-6 h-6 text-foreground" />
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 md:py-8">
                    <nav className="flex flex-col gap-1 max-w-sm mx-auto" aria-label="Mobile navigation">
                      {navLinks.map((link) => {
                        const active = pathname === link.href;

                        if (link.label === "Miorah") {
                          return (
                            <motion.div key={link.href} variants={itemVariants}>
                              <Link
                                href={link.href}
                                aria-label="Miorah by SriZen"
                                className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors"
                                onClick={() => setMenuOpen(false)}
                              >
                                <Image
                                  src="/assets/miorah.png"
                                  alt="Miorah by SriZen"
                                  width={480}
                                  height={325}
                                  className="h-8 w-auto"
                                />
                                <ChevronRight className="w-4 h-4 text-gray-300" />
                              </Link>
                            </motion.div>
                          );
                        }

                        return (
                          <motion.div key={link.href} variants={itemVariants}>
                            <Link
                              href={link.href}
                              className={`flex items-center justify-between py-4 px-4 rounded-xl text-[17px] font-medium transition-all duration-200 ${
                                active
                                  ? "text-primary bg-primary/5"
                                  : "text-foreground hover:text-primary hover:bg-primary/5"
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              {link.label}
                              {active ? (
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-gray-300" />
                              )}
                            </Link>
                          </motion.div>
                        );
                      })}

                      {/* Mobile CTA */}
                      <motion.div variants={itemVariants} className="mt-6 pt-6 border-t border-gray-100">
                        <Link
                          href="/contact"
                          className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-primary text-primary-foreground rounded-xl font-medium text-[16px] transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                          onClick={() => setMenuOpen(false)}
                        >
                          Get a Quote
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </motion.div>

                      {/* Footer Text */}
                      <motion.div variants={itemVariants} className="mt-8 text-center">
                        <p className="text-xs text-gray-400 tracking-wider">
                          © {new Date().getFullYear()} SriZen Group. All rights reserved.
                        </p>
                      </motion.div>
                    </nav>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}