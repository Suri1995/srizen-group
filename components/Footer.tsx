import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface FooterColProps {
  title: string;
  links: Array<[label: string, href: string]>;
}

const footerGroups: FooterColProps[] = [
  {
    title: "Quick Links",
    links: [
      ["About", "/about"],
      ["Services", "/services"],
      ["Projects", "/projects"],
      ["Industries", "/industries"],
      ["Careers", "/careers"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Sustainability", "/sustainability"],
      ["News & Insights", "/news"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Contact",
    links: [
      ["HITEC City, Hyderabad", "/contact"],
      ["+91 40 4567 8900", "tel:+914045678900"],
      ["info@srizengroup.com", "mailto:info@srizengroup.com"],
    ],
  },
];

const contactIcons: ReactNode[] = [
  // Pin
  <svg key="pin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>,
  // Phone
  <svg key="phone" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
  </svg>,
  // Mail
  <svg key="mail" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="m22 6-10 7L2 6" />
    <rect x="2" y="4" width="20" height="16" rx="2" />
  </svg>,
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/65 pt-20 md:pt-24 w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-14 lg:pb-20 border-b border-white/10 lg:grid lg:grid-cols-[1.4fr_0.85fr_0.85fr_0.9fr] lg:gap-12">
          {/* Brand */}
          <div className="pb-10 lg:pb-0">
            <Image
              src="/assets/srizen-logo.png"
              alt="SriZen Group"
              width={140}
              height={34}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-6 text-sm leading-relaxed max-w-[280px] text-white/45">
              Building tomorrow with precision — construction, infrastructure, engineering and
              real estate development.
            </p>
          </div>

          {/* Desktop (lg+): plain, always-visible columns */}
          {footerGroups.map((group, i) => (
            <div key={group.title} className="hidden lg:block">
              <StaticFooterCol {...group} withIcons={i === 2} />
            </div>
          ))}

          {/* Mobile & tablet (below lg): native accordions, no JS required */}
          <div className="lg:hidden border-t border-white/10">
            {footerGroups.map((group, i) => (
              <AccordionFooterCol key={group.title} {...group} withIcons={i === 2} />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between flex-wrap gap-3 py-7 text-[13px] text-white/40">
          <span>© 2026 SriZen Group. All rights reserved.</span>
          <span className="flex gap-3">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function LinkList({ links, withIcons }: { links: FooterColProps["links"]; withIcons?: boolean }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {links.map(([label, href], i) => (
        <li key={label}>
          <Link
            href={href}
            className="group flex items-start gap-2.5 text-[14.5px] text-white/70 transition-colors hover:text-cyan"
          >
            {withIcons && (
              <span className="mt-0.5 shrink-0 text-white/35 transition-colors group-hover:text-cyan">
                {contactIcons[i]}
              </span>
            )}
            <span>{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function StaticFooterCol({ title, links, withIcons }: FooterColProps & { withIcons?: boolean }) {
  return (
    <div>
      <h5 className="font-mono text-[11.5px] tracking-[.14em] uppercase text-white/40 mb-5">{title}</h5>
      <LinkList links={links} withIcons={withIcons} />
    </div>
  );
}

function AccordionFooterCol({ title, links, withIcons }: FooterColProps & { withIcons?: boolean }) {
  return (
    <details className="group border-b border-white/10 py-5 last:border-b-0">
      <summary
        className="flex cursor-pointer items-center justify-between font-mono text-[11.5px] tracking-[.14em] uppercase text-white/60 [&::-webkit-details-marker]:hidden [&::marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan rounded"
      >
        {title}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className="shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="pt-5">
        <LinkList links={links} withIcons={withIcons} />
      </div>
    </details>
  );
}