import { officeLocations } from "@/data/content";

function PinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false">
      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
      <path d="m22 6-10 7L2 6" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function OfficeLocations() {
  // Get the first (and only) office
  const office = officeLocations[0];
  
  if (!office) return null;

  const telHref = `tel:${office.phone.replace(/[^\d+]/g, "")}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Premium background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-bg-light/50 to-white" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-navy/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-3xl" />
      
      {/* Decorative map pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, #1a1a3e 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      <div className="wrap relative">
        {/* Section header */}
        <div className="section-head text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-navy/30" aria-hidden="true" />
            <p className="eyebrow text-[11px] font-mono tracking-[0.25em] uppercase text-navy/60 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-navy/5 shadow-sm">
              Our Headquarters
            </p>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-navy/30" aria-hidden="true" />
          </div>
          <h2 className="text-[38px] md:text-[48px] leading-[1.1] font-medium tracking-tight text-navy">
            Visit <span className="relative inline-block">
              our office
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-navy/60 to-navy/10 rounded-full" />
            </span>
          </h2>
          <p className="mt-4 text-ink-muted text-[16px] leading-relaxed max-w-lg mx-auto">
            We&apos;re centrally located in Hyderabad&apos;s business district. Come by for a coffee and let&apos;s discuss your project.
          </p>
        </div>

        {/* Single office card - Premium hero card style */}
        <div className="max-w-3xl mx-auto">
          <div className="group relative bg-white rounded-3xl border border-navy/5 p-10 md:p-14 transition-all duration-500 ease-premium hover:border-navy/20 hover:shadow-[0_30px_80px_-30px_rgba(20,33,61,0.2)] hover:-translate-y-1">
            {/* Premium gradient accents */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-navy/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tl from-blue-50/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden rounded-tr-3xl">
              <div className="absolute -top-1 -right-1 w-20 h-20 rotate-45 bg-gradient-to-br from-navy/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 overflow-hidden rounded-bl-3xl">
              <div className="absolute -bottom-1 -left-1 w-20 h-20 rotate-45 bg-gradient-to-tl from-navy/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* Main content layout */}
            <div className="relative flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              {/* Left: Icon & Location */}
              <div className="flex-1">
                {/* Large icon */}
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-navy to-navy/90 flex items-center justify-center text-white shadow-xl shadow-navy/20 group-hover:shadow-2xl group-hover:shadow-navy/30 transition-all duration-500">
                  <PinIcon />
                  {/* Pulsing ring */}
                  <span className="absolute inset-0 rounded-2xl border-2 border-navy/20 animate-ping group-hover:border-navy/40" />
                  <span className="absolute inset-0 rounded-2xl border border-navy/10" />
                </div>

                <h3 className="mt-6 font-display font-semibold text-2xl text-navy tracking-tight">
                  {office.city}
                </h3>

                <address className="mt-2 text-[15px] text-ink-muted leading-relaxed not-italic">
                  {office.address}
                </address>

                {/* Contact details grid */}
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <a
                    href={telHref}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-navy/5 text-[14px] font-medium text-navy/80 transition-all duration-300 hover:bg-navy hover:text-white hover:shadow-lg hover:shadow-navy/20 group/phone"
                  >
                    <span className="w-9 h-9 rounded-full bg-white/50 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover/phone:bg-white/20">
                      <PhoneIcon />
                    </span>
                    <span>{office.phone}</span>
                  </a>

                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-navy/5 text-[14px] text-ink-muted/80">
                    <span className="w-9 h-9 rounded-full bg-white/50 flex items-center justify-center shrink-0">
                      <ClockIcon />
                    </span>
                    <span className="text-[13px]">
                      <span className="font-medium text-navy">Mon – Sat</span>
                      <br />
                      9:00 AM – 6:30 PM IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: CTA & additional info */}
              <div className="flex flex-col items-start md:items-end gap-4 md:pt-2">
                {/* Get Directions */}
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Get directions to the office (opens in a new tab)`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-navy text-white text-[13px] font-mono uppercase tracking-[0.1em] transition-all duration-300 hover:bg-navy/90 hover:shadow-xl hover:shadow-navy/30 hover:gap-4 w-full md:w-auto justify-center group/btn"
                >
                  <span>Get Directions</span>
                  <ArrowIcon />
                </a>

                {/* Divider */}
                <div className="hidden md:block w-px h-16 bg-navy/10" />

                {/* Email */}
                <div className="flex items-center gap-2 text-[13px] text-ink-muted/70">
                  <EmailIcon />
                  <span className="font-medium text-navy/80">info@srizengroup.com</span>
                </div>

                {/* Badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono tracking-wide text-emerald-700">
                    Open Now
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom decorative line */}
            <div className="absolute -bottom-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </div>

        {/* Additional info cards */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-navy/5">
            <p className="text-[11px] font-mono tracking-[0.1em] uppercase text-navy/40">Accessibility</p>
            <p className="mt-1 text-[13px] text-navy/70 font-medium">Wheelchair accessible</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-navy/5">
            <p className="text-[11px] font-mono tracking-[0.1em] uppercase text-navy/40">Parking</p>
            <p className="mt-1 text-[13px] text-navy/70 font-medium">Ample parking available</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-navy/5">
            <p className="text-[11px] font-mono tracking-[0.1em] uppercase text-navy/40">Public Transport</p>
            <p className="mt-1 text-[13px] text-navy/70 font-medium">Near HITEC City metro</p>
          </div>
        </div>
      </div>
    </section>
  );
}