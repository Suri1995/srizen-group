// app/projects/miorah/components/Location.tsx
"use client";

import { forwardRef, useState } from "react";
import { 
  MapPin, 
  Compass, 
  Car, 
  Train, 
  Building2, 
  School, 
  Hospital, 
  ShoppingBag,
  Navigation,
  Clock,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { connectivity } from "../data";

// Map icons for different connectivity types
const getConnectivityIcon = (label: string) => {
  const iconMap: Record<string, any> = {
    "Warangal Highway": Car,
    "Uppal Metro Station": Train,
    "Cherlapally Railway Station": Train,
    "ORR Exit No. 7": Car,
    "Pocharam IT SEZ": Building2,
    "International Schools": School,
    "Hospitals & Retail": Hospital,
  };
  return iconMap[label] || MapPin;
};

// Get color for each connectivity item
const getConnectivityColor = (index: number) => {
  const colors = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-green-500 to-emerald-400",
    "from-orange-500 to-amber-400",
    "from-red-500 to-rose-400",
    "from-indigo-500 to-blue-400",
    "from-teal-500 to-cyan-400",
  ];
  return colors[index % colors.length];
};

export const Location = forwardRef<HTMLDivElement>((props, ref) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-white to-secondary/30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-navy/5 rounded-full blur-3xl" />
      
      <div className="wrap relative">
        <div ref={ref} className="reveal">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="eyebrow justify-center">
              <Sparkles className="h-4 w-4 text-cyan-500" />
              Location Highlights
            </div>
            <h2 className="text-navy text-3xl md:text-5xl font-display font-bold">
              Prime Location,{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Excellent Connectivity
              </span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted max-w-2xl mx-auto">
              SriZen MIORAH is strategically located in Boduppal with fast
              access to Hyderabad's major residential, IT and transit hubs —
              in one of the city's most rapidly developing neighbourhoods.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Left Side - Address Card */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                {/* Main Address Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="relative bg-white rounded-2xl border border-navy/10 shadow-xl p-6 md:p-8">
                    {/* Decorative Map Pin */}
                    <div className="absolute -top-3 -right-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <MapPin className="h-6 w-6 text-white" strokeWidth={2} />
                      </div>
                    </div>

                    <h3 className="text-sm font-mono uppercase tracking-[0.15em] text-ink-muted mb-3">
                      Visit Us
                    </h3>
                    <p className="text-base md:text-lg font-medium text-navy leading-relaxed">
                      Venkata Reddy Nagar, Bolligudem Road, Teliphone Colony,
                      Boduppal, Hyderabad, Telangana 500092
                    </p>

                    {/* Quick Stats */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="bg-secondary/50 rounded-xl p-3 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-navy">
                          <Clock className="h-4 w-4 text-cyan-500" />
                          <span className="text-xs font-medium">5 mins</span>
                        </div>
                        <p className="text-[10px] text-ink-muted mt-0.5">To Metro</p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-3 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-navy">
                          <Navigation className="h-4 w-4 text-cyan-500" />
                          <span className="text-xs font-medium">10 mins</span>
                        </div>
                        <p className="text-[10px] text-ink-muted mt-0.5">To ORR</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-navy text-white rounded-xl font-medium text-sm transition-all duration-300 hover:bg-navy-deep hover:shadow-lg hover:shadow-navy/20 group">
                      <Navigation className="h-4 w-4" />
                      Get Directions
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-6 flex items-center justify-center gap-6 text-xs text-ink-muted">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>Excellent Connectivity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span>Rapid Development</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Connectivity List */}
            <div className="lg:col-span-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-navy/10 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-navy to-navy-deep">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold text-sm">
                      Connectivity Highlights
                    </h4>
                    <span className="text-white/60 text-xs font-mono">
                      {connectivity.length} Locations
                    </span>
                  </div>
                </div>

                {/* List */}
                <div className="divide-y divide-navy/5">
                  {connectivity.map((c, i) => {
                    const Icon = getConnectivityIcon(c.label);
                    const isHovered = hoveredIndex === i;
                    const gradientColor = getConnectivityColor(i);

                    return (
                      <div
                        key={c.label}
                        className="group relative overflow-hidden"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {/* Hover Background */}
                        <div className={`
                          absolute inset-0 bg-gradient-to-r ${gradientColor} opacity-0 
                          transition-opacity duration-500 group-hover:opacity-5
                        `} />

                        <div className="relative flex items-center justify-between gap-4 px-4 md:px-6 py-4 md:py-5">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {/* Icon with gradient background */}
                            <div className={`
                              relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                              transition-all duration-300
                              ${isHovered ? 'scale-110' : 'scale-100'}
                            `}>
                              <div className={`
                                absolute inset-0 rounded-xl bg-gradient-to-br ${gradientColor} 
                                opacity-10 transition-opacity duration-300
                                ${isHovered ? 'opacity-20' : 'opacity-10'}
                              `} />
                              <Icon className={`
                                h-5 w-5 relative z-10 transition-colors duration-300
                                ${isHovered ? 'text-cyan-500' : 'text-navy/60'}
                              `} strokeWidth={1.75} />
                            </div>

                            <div className="flex-1 min-w-0">
                              {/* Number and Label */}
                              <div className="flex items-center gap-2">
                                <span className={`
                                  font-medium text-sm md:text-base transition-colors duration-300 truncate
                                  ${isHovered ? 'text-navy' : 'text-navy/80'}
                                `}>
                                  {c.label}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Note with arrow */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`
                              text-xs md:text-sm transition-all duration-300
                              ${isHovered ? 'text-navy font-medium' : 'text-ink-muted'}
                            `}>
                              {c.note}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-secondary/30 border-t border-navy/5">
                  <div className="flex items-center justify-between text-[10px] text-ink-muted">
                    <span>📍 All locations within 15 minutes reach</span>
                    <span>🚗 Easy access to major highways</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Location.displayName = "Location";