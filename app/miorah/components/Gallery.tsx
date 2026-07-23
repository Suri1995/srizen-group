// app/projects/miorah/components/Gallery.tsx
"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { galleryImages, galleryCategories } from "../data";

export const Gallery = forwardRef<HTMLDivElement>((props, ref) => {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>("All");
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  const filtered =
    filter === "All" ? galleryImages : galleryImages.filter((g) => g.category === filter);
  const active = filtered[index] ?? filtered[0];

  // Reset position when the filter changes
  useEffect(() => setIndex(0), [filter]);

  // Keep the active thumbnail in view as index changes
  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  // Bring the clicked category tab into view — so tapping a tab near the
  // edge scrolls it (and its neighbor) fully into frame, instead of leaving
  // it half-cut-off
  const selectCategory = (c: (typeof galleryCategories)[number], i: number) => {
    setFilter(c);
    tabRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + filtered.length) % filtered.length);

  // Keyboard + scroll-lock for the lightbox
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, filtered.length]);

  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    touchX.current = null;
  };

  const num = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <section id="gallery" className="wrap py-12 md:py-20 border border-b border-b-emerald-200">
      <style>{`
        @keyframes miorahFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .miorah-frame img { animation: miorahFade 0.5s ease; }
        @media (prefers-reduced-motion: reduce) {
          .miorah-frame img { animation: none; }
        }
      `}</style>

      <div ref={ref} className="reveal section-head mx-auto text-center">
        <div className="eyebrow mx-auto">Gallery</div>
        <h2 className="mx-auto text-navy">A Closer Look at MIORAH</h2>
        <p className="mx-auto">
          From the clubhouse to the last finishing touch — an editorial walk
          through the spaces that make up everyday life here.
        </p>
      </div>

      {/* Category nav — thin sliding underline, not pills */}
      <div className="relative mb-10 p-2.5 md:p-0">
        <div className="flex snap-x snap-mandatory justify-start gap-6 overflow-x-auto px-4 sm:px-6 md:justify-center md:gap-8 md:px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-6 border-b border-navy/10 md:gap-8">
            {galleryCategories.map((c, i) => (
              <button
                key={c}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                onClick={() => selectCategory(c, i)}
                className={`relative shrink-0 snap-start whitespace-nowrap pb-4 text-sm font-semibold tracking-[.02em] transition-colors duration-300 ${
                  filter === c ? "text-navy" : "text-navy/40 hover:text-navy/70"
                }`}
              >
                {c}
                <span
                  className={`absolute inset-x-0 -bottom-px h-[2px] origin-center rounded-full bg-cyan transition-transform duration-300 ${
                    filter === c ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
</div>

      {/* Cinematic main viewer — sized off the viewport so it's always fully visible */}
      <div
        className="miorah-frame relative mx-auto overflow-hidden rounded-[28px] bg-[#00072e]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative h-[52vh] min-h-[360px] max-h-[560px] w-full sm:h-[60vh] sm:max-h-[640px] md:h-[72vh] md:max-h-[760px]">
          <img
            key={active.src}
            src={active.src}
            alt={active.alt}
            className="h-full w-full object-cover"
          />

          {/* Top scrim — fully masks any baked-in corner label on placeholder art */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#00072e]/80 to-transparent md:h-28" />

          {/* Bottom scrim — solid + blurred, not a thin gradient, so caption is always legible */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#00072e] via-[#00072e]/85 to-transparent md:h-44" />

          {/* Caption bar */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 rounded-b-[28px] bg-[#00072e]/70 p-5 backdrop-blur-md md:p-9">
            <div className="min-w-0">
              <div className="font-mono text-[11px] uppercase tracking-[.25em] text-cyan">
                {active.category}
              </div>
              <p className="mt-2 max-w-md truncate text-base font-medium text-white md:text-xl">
                {active.alt}
              </p>
            </div>
            {/* <button
              onClick={() => setLightbox(true)}
              aria-label="Expand image"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-cyan hover:text-cyan md:h-12 md:w-12"
            >
              <Expand className="h-5 w-5" />
            </button> */}
          </div>

          {/* Desktop arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#00072e]/40 text-white/80 backdrop-blur-sm transition-colors hover:border-cyan hover:text-cyan md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#00072e]/40 text-white/80 backdrop-blur-sm transition-colors hover:border-cyan hover:text-cyan md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filmstrip */}
      <div className="mt-5 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {filtered.map((img, i) => (
          <button
            key={img.src}
            ref={(el) => {
              thumbRefs.current[i] = el;
            }}
            onClick={() => setIndex(i)}
            aria-label={`View ${img.alt}`}
            className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300 md:h-24 md:w-32 ${
              i === index
                ? "opacity-100 ring-2 ring-cyan ring-offset-2 ring-offset-white"
                : "opacity-45 hover:opacity-80"
            }`}
          >
            <img src={img.src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#00072e]/97 p-4 backdrop-blur-md md:p-10"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-cyan hover:text-cyan"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute left-5 top-5 font-mono text-xs uppercase tracking-[.2em] text-cyan md:left-10 md:top-10">
            {active.category} &middot; {num(index)} / {num(filtered.length - 1)}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-cyan hover:text-cyan md:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <img
            src={active.src}
            alt={active.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-cyan hover:text-cyan md:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <p className="absolute bottom-6 left-1/2 max-w-[80%] -translate-x-1/2 text-center text-sm text-white/70">
            {active.alt}
          </p>
        </div>
      )}
    </section>
  );
});

Gallery.displayName = "Gallery";