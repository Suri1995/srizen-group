import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

interface FooterColProps {
  title: string;
  links: Array<[label: string, href: string]>;
}

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/65 pt-24">
      <div className="wrap">
        <div className="grid md:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_1fr] gap-12 pb-20 border-b border-white/10">
          <div>
            <Image
              src="/assets/srizen-logo.png"
              alt="SriZen Group"
              width={140}
              height={34}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="mt-6 text-sm leading-relaxed max-w-[280px] text-white/45">
              Building tomorrow with precision — construction, infrastructure, engineering and
              real estate development.
            </p>
          </div>

          <FooterCol
            title="Quick Links"
            links={[
              ["About", "/about"],
              ["Services", "/services"],
              ["Projects", "/projects"],
              ["Industries", "/industries"],
              ["Careers", "/careers"],
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              ["Sustainability", "/sustainability"],
              ["News & Insights", "/news"],
              ["Contact", "/contact"],
            ]}
          />
          <FooterCol
            title="Contact"
            links={[
              ["HITEC City, Hyderabad", "/contact"],
              ["+91 40 4567 8900", "tel:+914045678900"],
              ["info@srizengroup.com", "mailto:info@srizengroup.com"],
            ]}
          />

          <div>
            <h5 className="font-mono text-[11.5px] tracking-[.14em] uppercase text-white/40 mb-5">
              Newsletter
            </h5>
            <p className="text-[13.5px] text-white/45 mb-4">
              Project updates, insights, and news — occasionally.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex justify-between flex-wrap gap-3 py-7 text-[13px] text-white/40">
          <span>© 2026 SriZen Group. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: FooterColProps) {
  return (
    <div>
      <h5 className="font-mono text-[11.5px] tracking-[.14em] uppercase text-white/40 mb-5">
        {title}
      </h5>
      <ul className="flex flex-col gap-3.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="text-[14.5px] text-white/70 hover:text-cyan transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
