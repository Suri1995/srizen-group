// app/projects/miorah/components/Gallery.tsx
"use client";

import { forwardRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { galleryImages, galleryCategories } from "../data";

export const Gallery = forwardRef<HTMLDivElement>((props, ref) => {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>("All");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const filtered =
    filter === "All" ? galleryImages : galleryImages.filter((g) => g.category === filter);

  const openAt = (i: number) => setActiveIdx(i);
  const close = () => setActiveIdx(null);
  const prev = () => setActiveIdx((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const next = () => setActiveIdx((i) => (i === null ? null : (i + 1) % filtered.length));

  // Keyboard nav for the lightbox
  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, filtered.length]);

  // Reset lightbox if the active filter no longer contains the open image
  useEffect(() => setActiveIdx(null), [filter]);

  const active = activeIdx !== null ? filtered[activeIdx] : null;

  return (
    <section id="gallery" className="wrap py-24 md:py-32">
      <div ref={ref} className="reveal section-head mx-auto text-center">
        <div className="eyebrow mx-auto">Gallery</div>
        <h2 className="mx-auto text-navy">A Closer Look at MIORAH</h2>
        <p className="mx-auto">
          From the clubhouse to the last finishing touch — browse the
          spaces that make up everyday life at MIORAH.
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {galleryCategories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold tracking-[.01em] transition-all duration-300 ${
              filter === c
                ? "border-navy bg-navy text-white"
                : "border-navy/20 bg-white text-navy/60 hover:border-navy/50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Bento-style masonry grid */}
      <div className="grid auto-rows-[110px] grid-cols-2 gap-4 sm:grid-cols-4 md:auto-rows-[130px] md:grid-cols-6">
        {filtered.map((img, i) => (
          <button
            key={img.src}
            onClick={() => openAt(i)}
            className={`group relative overflow-hidden rounded-2xl ${img.span}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00072e]/70 via-[#00072e]/0 to-[#00072e]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-left text-[13px] font-medium leading-tight text-white">
                {img.alt}
              </span>
              <Expand className="h-4 w-4 flex-shrink-0 text-cyan" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#00072e]/95 p-4 backdrop-blur-sm md:p-10"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-cyan hover:text-cyan"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute left-5 top-5 font-mono text-xs uppercase tracking-[.2em] text-cyan md:left-10 md:top-10">
            {active.category} &middot; {(activeIdx ?? 0) + 1} / {filtered.length}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
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
              next();
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