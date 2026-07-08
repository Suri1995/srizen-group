"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/content";

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-premium ${
        solid
          ? "bg-bg-light/85 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,15,102,0.08)] py-4"
          : "py-6"
      }`}
    >
      <div className="wrap flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/srizen-logo.png"
            alt="SriZen Group"
            width={160}
            height={40}
            className={`h-8 w-auto transition-all duration-500 ${solid ? "" : "brightness-0 invert"}`}
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[14.5px] font-medium tracking-[.01em] py-1 group transition-colors ${
                  solid
                    ? active
                      ? "text-navy"
                      : "text-ink/75 hover:text-navy"
                    : active
                    ? "text-white"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-px transition-all duration-300 ease-premium group-hover:w-full ${
                    active ? "w-full" : "w-0"
                  } ${solid ? "bg-navy" : "bg-cyan"}`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/contact"
            className={`hidden lg:inline-flex btn ${solid ? "btn-ghost-solid" : "btn-ghost"} !py-3 !px-6 !text-sm`}
          >
            Get a Quote
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative w-6 h-[18px]"
          >
            {[0, 8, 16].map((top) => (
              <span
                key={top}
                style={{ top }}
                className={`absolute left-0 w-full h-[1.5px] transition-colors ${
                  solid ? "bg-navy" : "bg-white"
                }`}
              />
            ))}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-[74px] bg-navy flex flex-col items-start gap-6 px-8 py-10 z-[999] overflow-y-auto">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-white text-lg font-medium">
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-ghost mt-2">
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
