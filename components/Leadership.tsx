"use client";

import Image from "next/image";
import { Linkedin, Twitter, Mail, type LucideIcon } from "lucide-react";
import { leadership } from "@/data/content";
import { motion } from "framer-motion";

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

function getSocialLinks(name: string): SocialLink[] {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return [
    { icon: Linkedin, href: `https://linkedin.com/in/${slug}`, label: `${name} on LinkedIn` },
    { icon: Twitter, href: `https://twitter.com/${slug}`, label: `${name} on Twitter` },
    { icon: Mail, href: `mailto:${slug}@srizengroup.com`, label: `Email ${name}` },
  ];
}

export default function Leadership() {
  return (
    <section className="relative py-8 md:py-20 bg-gradient-to-b from-white via-secondary/5 to-white overflow-hidden">
      <div className="wrap relative">
        <div className="section-head">
          <motion.div className="flex items-center gap-4 mb-5 md:mb-8">
              <div className="w-10 h-px bg-primary" />
              <span className="text-[13px] tracking-[0.25em] uppercase font-medium text-primary">
                Leadership
              </span>
            </motion.div>
          <h2>
            The people behind <span className="text-[#01a8a8]">SriZen</span>
          </h2>
          <p className="mt-3 text-[#3f3f3f] text-[15px]">
            A leadership team with decades of combined experience in engineering, delivery, and sustainable design.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {leadership.map((l, i) => {
            const socials = getSocialLinks(l.name);
            return (
              <div
                key={l.name}
                className="group relative rounded-2xl overflow-hidden bg-white border border-primary/10 shadow-[0_10px_34px_-16px_rgba(15,23,42,0.18)] hover:shadow-[0_22px_48px_-16px_rgba(15,23,42,0.28)] hover:-translate-y-1.5 transition-all duration-500 ease-out"
              >
                {/* photo */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={l.photo}
                    alt={l.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-110 transition-all duration-700 ease-out"
                  />

                  {/* gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />


                  {/* social icons - reveal on hover */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    {socials.map(({ icon: Icon, href, label }, idx) => (
                      <a
                        key={idx}
                        href={href}
                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        aria-label={label}
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-700 backdrop-blur-sm text-white hover:bg-accent hover:text-primary/50 transition-colors duration-300"
                      >
                        <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                      </a>
                    ))}
                  </div>

                  {/* name + role over photo */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h4 className="font-display text-lg font-bold text-white leading-tight">{l.name}</h4>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="h-[2px] w-4 rounded-full bg-gradient-to-r from-accent to-white/60" />
                      <p className="text-[12.5px] font-medium text-white/85 tracking-wide">{l.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}