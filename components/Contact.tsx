"use client";
import type { ReactNode } from "react";
import useReveal from "./useReveal";

interface ContactRow {
  label: string;
  value: string;
  icon: ReactNode;
}

const rows: ContactRow[] = [
  {
    label: "Office",
    value: "SriZen Towers, HITEC City, Hyderabad, Telangana 500081",
    icon: (
      <>
        <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    label: "Phone",
    value: "+91 40 4567 8900",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: "Email",
    value: "info@srizengroup.com",
    icon: (
      <>
        <path d="m22 6-10 7L2 6" />
        <rect x="2" y="4" width="20" height="16" rx="2" />
      </>
    ),
  },
  {
    label: "Business Hours",
    value: "Mon – Sat, 9:00 AM – 6:30 PM IST",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  },
];

export default function Contact() {
  const [ref, inView] = useReveal<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28">
      <div className="wrap grid md:grid-cols-[0.9fr_1.1fr] gap-16 md:gap-24">
        <div ref={ref} data-in={inView} className="reveal">
          <p className="eyebrow">Get In Touch</p>
          <h2 className="text-[32px] md:text-[48px]">Let&apos;s build something exceptional</h2>
          <p className="mt-5 text-ink-muted text-lg leading-relaxed max-w-[420px]">
            Tell us about your project and our team will get back to you within one business day.
          </p>

          <div className="mt-11 flex flex-col gap-y-6">
            {rows.map((row) => (
              <div key={row.label} className="flex gap-[18px]">
                <div className="w-[42px] h-[42px] rounded-lg bg-bg-light flex items-center justify-center text-navy shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {row.icon}
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-[.14em] uppercase text-ink-muted">
                    {row.label}
                  </div>
                  <div className="text-[15px] mt-1 font-medium">{row.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-10">
            {["LinkedIn", "Twitter", "Instagram"].map((label) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-navy/20 flex items-center justify-center transition-all duration-300 hover:bg-navy hover:border-navy hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="bg-bg-light p-10 rounded-lg">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="field">
              <input type="text" placeholder=" " required />
              <label>Full Name</label>
            </div>
            <div className="field">
              <input type="email" placeholder=" " required />
              <label>Email Address</label>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="field">
              <input type="tel" placeholder=" " />
              <label>Phone Number</label>
            </div>
            <div className="field">
              <input type="text" placeholder=" " />
              <label>Project Type</label>
            </div>
          </div>
          <div className="field">
            <textarea placeholder=" " />
            <label>Tell us about your project</label>
          </div>
          <button type="submit" className="btn btn-primary w-full justify-center">
            Send Message <span className="arrow">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}
