"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-24 md:py-36">
      <div className="wrap">
        <div className="max-w-[820px] mx-auto text-center">
          <p className="eyebrow justify-center">Client Voices</p>

          <div key={current} className="animate-fadeUp">
            <div className="flex justify-center gap-1 mb-8 text-green text-lg">★★★★★</div>
            <p className="font-display text-xl md:text-[28px] font-medium leading-snug text-navy">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4 mt-9">
              <div className="relative w-[52px] h-[52px] rounded-full overflow-hidden">
                <Image src={t.photo} alt={t.name} fill className="object-cover" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-[14.5px]">{t.name}</div>
                <div className="text-[13px] text-ink-muted">{t.role}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2.5 mt-11">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-[22px] bg-navy" : "w-2 bg-navy/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
