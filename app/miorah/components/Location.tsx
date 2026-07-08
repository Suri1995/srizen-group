// app/projects/miorah/components/Location.tsx
import { forwardRef } from "react";
import { MapPin } from "lucide-react";
import { connectivity } from "../data";

export const Location = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section className="wrap py-24 md:py-32">
      <div ref={ref} className="reveal grid grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="eyebrow">Location Highlights</div>
          <h2 className="text-navy">Excellent Connectivity, Prime Location</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            SriZen MIORAH is strategically located in Boduppal with fast
            access to Hyderabad's major residential, IT and transit hubs —
            in one of the city's most rapidly developing neighbourhoods.
          </p>
          <div className="mt-8 flex items-center gap-3 rounded-xl border border-navy/10 bg-secondary p-5">
            <MapPin className="h-5 w-5 flex-shrink-0 text-navy" />
            <p className="text-sm text-ink-muted">
              Venkata Reddy Nagar, Bolligudem Road, Teliphone Colony,
              Boduppal, Hyderabad, Telangana 500092
            </p>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="divide-y divide-navy/10 rounded-2xl border border-navy/10">
            {connectivity.map((c, i) => (
              <div
                key={c.label}
                className="flex items-center justify-between gap-6 px-6 py-5"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-navy/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-navy">{c.label}</span>
                </div>
                <span className="text-right text-sm text-ink-muted">{c.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Location.displayName = "Location";