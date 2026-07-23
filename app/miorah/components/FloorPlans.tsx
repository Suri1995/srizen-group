"use client";

import {
  forwardRef,
  useEffect,
  useState,
  useId,
  useCallback,
  useRef,
} from "react";
import Image from "next/image";
import {
  Download,
  X,
  ZoomIn,
  ZoomOut,
  Compass,
  Ruler,
  Layers,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Sparkles,
  RotateCcw,
  type LucideProps,
} from "lucide-react";
import { floorPlans } from "../data";

const FLOORS = [
  { key: "second", label: "02", name: "Second Floor", code: "2F" },
  { key: "first", label: "01", name: "First Floor", code: "1F" },
  { key: "ground", label: "G", name: "Ground Floor", code: "GF" },
] as const;

type FloorKey = (typeof FLOORS)[number]["key"];

// Largest footprint in the range — used to scale the relative-size bars
// on each villa card so buyers can compare plots at a glance.
const MAX_SQYDS = Math.max(...floorPlans.map((t) => parseFloat(t.sqyds)));

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

export const FloorPlans = forwardRef<HTMLDivElement>((props, ref) => {
  const [typeIdx, setTypeIdx] = useState(0);
  const [floor, setFloor] = useState<FloorKey>("ground");
  const [lightbox, setLightbox] = useState(false);

  // ---- Crossfade state for the main plan image ----
  const type = floorPlans[typeIdx];
  const activeFloor =
    type.floors.find((f) => f.key === floor) ?? type.floors[0];

  const [displaySrc, setDisplaySrc] = useState(activeFloor.image);
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const villaListRef = useRef<HTMLDivElement>(null);
  const floorBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const headingId = useId();
  const tabsListId = useId();
  const lightboxTitleId = useId();
  const zoomButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const floorIdx = FLOORS.findIndex((f) => f.key === floor);
  const sqydsNum = parseFloat(type.sqyds);
  const sizePct = Math.max(8, Math.round((sqydsNum / MAX_SQYDS) * 100));

  useEffect(() => {
    setFloor("ground");
  }, [typeIdx]);

  // Crossfade to the new plan whenever the active image changes.
  useEffect(() => {
    if (activeFloor.image === displaySrc) return;
    setPrevSrc(displaySrc);
    setDisplaySrc(activeFloor.image);
    setTransitioning(true);
    setImgLoading(true);

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransitioning(false));
    });
    const cleanup = setTimeout(() => setPrevSrc(null), 550);
    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(cleanup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFloor.image]);

  const scrollVillaList = (direction: "prev" | "next") => {
    if (!villaListRef.current) return;
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      const amount = direction === "prev" ? -240 : 240;
      villaListRef.current.scrollBy({ top: amount, behavior: "smooth" });
    } else {
      const amount = direction === "prev" ? -280 : 280;
      villaListRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const stepFloor = useCallback(
    (dir: 1 | -1) => {
      const next = (floorIdx + dir + FLOORS.length) % FLOORS.length;
      setFloor(FLOORS[next].key);
      return next;
    },
    [floorIdx]
  );

  const handleFloorGroupKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
      return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (idx + dir + FLOORS.length) % FLOORS.length;
    setFloor(FLOORS[next].key);
    floorBtnRefs.current[next]?.focus();
  };

  // ---- Lightbox pan & zoom ----
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });

  const resetZoom = useCallback(() => {
    setZoomScale(1);
    setZoomPos({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetZoom();
  }, [floor, typeIdx, lightbox, resetZoom]);

  const handleWheelZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setZoomScale((s) => {
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, s + delta));
      if (next === MIN_ZOOM) setZoomPos({ x: 0, y: 0 });
      return next;
    });
  };

  const handleDoubleClickZoom = () => {
    setZoomScale((s) => {
      if (s > 1) {
        setZoomPos({ x: 0, y: 0 });
        return 1;
      }
      return 2.5;
    });
  };

  const startDrag = (clientX: number, clientY: number) => {
    if (zoomScale <= 1) return;
    dragRef.current = {
      dragging: true,
      startX: clientX,
      startY: clientY,
      origX: zoomPos.x,
      origY: zoomPos.y,
    };
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!dragRef.current.dragging) return;
    const dx = clientX - dragRef.current.startX;
    const dy = clientY - dragRef.current.startY;
    setZoomPos({ x: dragRef.current.origX + dx, y: dragRef.current.origY + dy });
  };

  const endDrag = () => {
    dragRef.current.dragging = false;
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightbox) return;

      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft" && zoomScale === 1) stepFloor(-1);
      if (e.key === "ArrowRight" && zoomScale === 1) stepFloor(1);
      if (e.key === "+" || e.key === "=")
        setZoomScale((s) => Math.min(MAX_ZOOM, s + 0.3));
      if (e.key === "-") setZoomScale((s) => Math.max(MIN_ZOOM, s - 0.3));
      if (e.key === "0") resetZoom();

      if (e.key === "Tab" && closeButtonRef.current) {
        e.preventDefault();
        closeButtonRef.current.focus();
      }
    },
    [lightbox, stepFloor, zoomScale, resetZoom]
  );

  useEffect(() => {
    if (lightbox) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      zoomButtonRef.current?.focus();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightbox, handleKeyDown]);

  return (
    <section
      id="floor-plans"
      aria-labelledby={headingId}
      className="wrap py-16 md:py-28 border-b border-navy/10 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan/10 blur-[120px] pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(#0f2942_1px,transparent_1px),linear-gradient(90deg,#0f2942_1px,transparent_1px)] [background-size:44px_44px]"
      />

      {/* Section Header */}
      <div ref={ref} className="reveal section-head max-w-2xl">
        <div className="eyebrow flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-cyan" />
          <span>Architectural Blueprints</span>
        </div>
        <h2
          id={headingId}
          className="text-navy text-3xl md:text-4xl font-serif font-semibold tracking-tight"
        >
          Explore Every Level of Your Triplex
        </h2>
        <p className="text-navy/70 text-sm md:text-base leading-relaxed mt-2">
          Select from various villa footprints and seamlessly toggle between
          optimized ground, first, and second floor layouts.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[210px_1fr]">
        {/* FAR LEFT: Villa Footprint Selector */}
        <div className="flex flex-col rounded-3xl border border-navy/10 bg-white/80 p-3 shadow-xl shadow-navy/5 backdrop-blur-md h-fit lg:sticky lg:top-24">
          <div>
            <div className="flex items-center justify-between px-3 py-2 border-b border-navy/5 mb-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy/60">
                Villa Footprint
              </span>
              <span className="rounded-full bg-navy/5 px-2 py-0.5 font-mono text-[9px] font-semibold text-navy">
                {floorPlans.length} Types
              </span>
            </div>

            <div
              ref={villaListRef}
              role="tablist"
              id={tabsListId}
              aria-label="Select Villa Size and Type"
              className="flex max-h-none w-full gap-2.5 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:max-h-[560px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1"
            >
              {floorPlans.map((t, i) => {
                const isSelected = i === typeIdx;
                const barPct = Math.max(
                  8,
                  Math.round((parseFloat(t.sqyds) / MAX_SQYDS) * 100)
                );
                return (
                  <button
                    key={t.type}
                    role="tab"
                    id={`tab-${i}`}
                    aria-selected={isSelected}
                    aria-controls={`tabpanel-${i}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setTypeIdx(i)}
                    className={`group relative flex min-w-[136px] flex-shrink-0 flex-col items-start justify-center rounded-2xl border p-3.5 text-left transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2 lg:w-full lg:min-w-0 ${
                      isSelected
                        ? "border-navy bg-navy text-white shadow-md shadow-navy/20 scale-[1.01]"
                        : "border-navy/10 bg-white text-navy hover:border-navy/30 hover:bg-slate-50/80"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={`font-mono text-[9px] font-bold uppercase tracking-wider ${
                          isSelected ? "text-cyan" : "text-navy/50"
                        }`}
                      >
                        {t.type}
                      </span>
                      <div className="flex items-center gap-1">
                        <Compass
                          aria-hidden
                          className={`h-3 w-3 transition-transform duration-300 ${
                            t.facing === "East Facing"
                              ? "rotate-90"
                              : "-rotate-90"
                          } ${isSelected ? "text-cyan" : "text-navy/40"}`}
                        />
                        {isSelected && (
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan text-navy shadow-sm">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-display text-lg font-bold leading-none tracking-tight">
                        {t.sqyds}
                      </span>
                      <span
                        className={`text-[10px] font-medium ${
                          isSelected ? "text-white/80" : "text-navy/60"
                        }`}
                      >
                        Sq. Yds
                      </span>
                    </div>

                    {/* Relative footprint bar — precise, at-a-glance size comparison */}
                    <div
                      className={`mt-2 h-1 w-full overflow-hidden rounded-full ${
                        isSelected ? "bg-white/15" : "bg-navy/10"
                      }`}
                      aria-hidden
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isSelected ? "bg-cyan" : "bg-navy/40"
                        }`}
                        style={{ width: `${barPct}%` }}
                      />
                    </div>

                    <span
                      className={`mt-2 text-[10px] font-medium rounded-md px-1.5 py-0.5 ${
                        isSelected
                          ? "bg-white/10 text-white/90"
                          : "bg-navy/5 text-navy/70"
                      }`}
                    >
                      {t.facing}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-center gap-2 border-t border-navy/10 pt-2.5">
            <button
              type="button"
              onClick={() => scrollVillaList("prev")}
              aria-label="Scroll villa list up"
              className="hidden h-8 w-8 items-center justify-center rounded-xl border border-navy/15 text-navy hover:bg-navy hover:text-white transition-all duration-200 active:scale-95 lg:flex"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollVillaList("next")}
              aria-label="Scroll villa list down"
              className="hidden h-8 w-8 items-center justify-center rounded-xl border border-navy/15 text-navy hover:bg-navy hover:text-white transition-all duration-200 active:scale-95 lg:flex"
            >
              <ChevronDown className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollVillaList("prev")}
              aria-label="Scroll villa list left"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-navy/15 text-navy hover:bg-navy hover:text-white transition-all duration-200 active:scale-95 lg:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollVillaList("next")}
              aria-label="Scroll villa list right"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-navy/15 text-navy hover:bg-navy hover:text-white transition-all duration-200 active:scale-95 lg:hidden"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* RIGHT WORKSPACE */}
        <div
          role="tabpanel"
          id={`tabpanel-${typeIdx}`}
          aria-labelledby={`tab-${typeIdx}`}
          className="grid grid-cols-1 gap-4 rounded-3xl border border-navy/10 bg-slate-100/70 p-3.5 backdrop-blur-md md:grid-cols-[104px_1fr] md:p-5"
        >
          {/* Elevation-style Floor Selector */}
          <div
            role="radiogroup"
            aria-label="Select Floor Level"
            className="flex flex-row items-stretch justify-between gap-2 rounded-2xl bg-white/90 p-2 border border-navy/10 shadow-sm backdrop-blur-sm md:flex-col md:justify-center md:gap-2.5 md:p-3"
          >
            {FLOORS.map((f, i) => {
              const isActive = floor === f.key;
              return (
                <button
                  key={f.key}
                  ref={(el) => {
                    floorBtnRefs.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setFloor(f.key)}
                  onKeyDown={(e) => handleFloorGroupKeyDown(e, i)}
                  aria-label={`Show ${f.name}`}
                  className={`group relative flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-4 font-mono transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2 md:flex-1 ${
                    isActive
                      ? "bg-navy text-white shadow-lg shadow-navy/20 font-bold"
                      : "text-navy/60 hover:bg-navy/5 hover:text-navy"
                  }`}
                >
                  <span
                    className={`text-2xl leading-none font-bold ${
                      isActive ? "text-cyan" : "text-navy"
                    }`}
                  >
                    {f.label}
                  </span>
                  <span className="hidden text-[9px] uppercase tracking-[0.15em] font-semibold md:block opacity-80">
                    {f.code}
                  </span>
                  {isActive && (
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 hidden h-6 w-1 rounded-r-full bg-cyan md:block" />
                  )}
                </button>
              );
            })}

            {/* Miniature elevation rail — reflects the G+2 stack as one glance */}
            <div
              aria-hidden
              className="hidden flex-col items-center gap-1 pt-2 md:flex"
            >
              <div className="h-px w-6 bg-navy/10" />
              <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-navy/35">
                G+2
              </span>
            </div>
          </div>

          {/* MAIN FLOOR PLAN DISPLAY PANEL */}
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-md">
            <div className="flex items-center justify-between gap-4 border-b border-navy/10 bg-slate-50/70 px-5 py-3.5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/5 font-mono text-xs font-bold text-navy border border-navy/10">
                  {FLOORS.find((f) => f.key === floor)?.code}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-navy/60">
                      {type.type}
                    </span>
                    <span className="text-navy/30">&middot;</span>
                    <span className="text-xs font-bold text-navy">
                      {activeFloor.name}
                    </span>
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-navy leading-tight">
                    {type.sqyds} Sq. Yds &mdash; {type.facing}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">

                <a
                  href={type.pdf}
                  download
                  aria-label={`Download working drawing PDF for ${type.type}`}
                  className="btn btn-primary flex items-center gap-1.5 text-xs py-2 px-3.5 shadow-md shadow-navy/10 hover:shadow-lg transition-all"
                >
                  <span className="hidden sm:inline">Download Floorplan</span>
                  <span className="">{`(PDF)`}</span>
                  <Download className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* MAIN IMAGE CANVAS — crossfades between plans, no hard cuts */}
            <button
              type="button"
              onClick={() => setLightbox(true)}
              aria-label={`Enlarge plan image for ${activeFloor.name}`}
              className="group relative flex min-h-[clamp(340px,52vh,600px)] w-full cursor-zoom-in items-center justify-center bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] p-6 focus-visible:outline-2 focus-visible:outline-navy md:p-8"
            >
              {/* Blueprint corner registration marks */}
              {[
                "top-3 left-3 border-l border-t",
                "top-3 right-3 border-r border-t",
                "bottom-3 left-3 border-l border-b",
                "bottom-3 right-3 border-r border-b",
              ].map((pos) => (
                <span
                  key={pos}
                  aria-hidden
                  className={`pointer-events-none absolute h-4 w-4 border-navy/20 ${pos}`}
                />
              ))}

              <div className="relative aspect-[4/3] w-full max-w-[700px] transition-transform ease-out group-hover:scale-[1.015]">
                {/* Loading skeleton — shows only while the very first plan loads */}
                {imgLoading && !prevSrc && (
                  <div className="absolute inset-2 animate-pulse rounded-lg bg-navy/5" />
                )}

                {prevSrc && (
                  <Image
                    key={`prev-${prevSrc}`}
                    src={prevSrc}
                    alt=""
                    aria-hidden
                    fill
                    className={`object-contain p-2 drop-shadow-md transition-opacity duration-500 ease-out ${
                      transitioning ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}
                <Image
                  key={`current-${displaySrc}`}
                  src={displaySrc}
                  alt={`Architectural floor plan for ${type.type}, ${activeFloor.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                  onLoadingComplete={() => setImgLoading(false)}
                  className={`object-contain p-2 drop-shadow-md transition-opacity duration-500 ease-out ${
                    transitioning ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border border-navy/10 bg-white/90 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-navy/50 backdrop-blur-sm">
                Scale 1:100 &middot; NTS
              </div>

              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-navy/80 px-3 py-1 text-[10px] font-mono text-white/90 backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ZoomIn className="h-3 w-3 text-cyan" />
                <span>Click to Expand</span>
              </div>
            </button>

            {/* SLIM SPEC STRIP — reference info only, action already lives in the header */}
            <div className="flex flex-wrap items-center gap-5 border-t border-navy/10 bg-slate-50/80 px-5 py-3 sm:gap-8">
              <SpecChip
                icon={Ruler}
                label="Plot Dimension"
                value={`${type.sqyds} Sq. Yds`}
              />
              <div className="hidden h-7 w-[1px] bg-navy/10 sm:block" />
              <SpecChip icon={Compass} label="Orientation" value={type.facing} />
              <div className="hidden h-7 w-[1px] bg-navy/10 sm:block" />
              <SpecChip icon={Layers} label="Elevation" value="G+2 Triplex" />
            </div>
          </div>
        </div>
      </div>

      {/* ENLARGED LIGHTBOX MODAL — now with pan & zoom */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={lightboxTitleId}
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-navy/95 p-4 backdrop-blur-xl md:p-8 animate-in fade-in duration-200"
          onClick={() => setLightbox(false)}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:44px_44px]"
          />

          <div
            className="relative z-10 flex w-full max-w-[92vw] items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-cyan/20 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-cyan border border-cyan/30">
                {type.type}
              </span>
              <div
                id={lightboxTitleId}
                className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-white/90"
              >
                {activeFloor.name} &middot; {type.sqyds} Sq. Yds
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom controls */}
              <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() =>
                    setZoomScale((s) => Math.max(MIN_ZOOM, s - 0.4))
                  }
                  aria-label="Zoom out"
                  disabled={zoomScale <= MIN_ZOOM}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="min-w-[3.5ch] text-center font-mono text-[11px] text-white/70">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setZoomScale((s) => Math.min(MAX_ZOOM, s + 0.4))
                  }
                  aria-label="Zoom in"
                  disabled={zoomScale >= MAX_ZOOM}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={resetZoom}
                  aria-label="Reset zoom"
                  disabled={zoomScale === 1 && zoomPos.x === 0 && zoomPos.y === 0}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setLightbox(false)}
                aria-label="Close enlarged floor plan view"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-cyan hover:bg-cyan hover:text-navy focus-visible:outline-2 focus-visible:outline-cyan"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            className="relative z-10 mt-4 flex max-h-[68vh] max-w-[92vw] items-center justify-center overflow-hidden rounded-3xl bg-white p-4 shadow-2xl border border-white/20 md:p-8"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheelZoom}
            onDoubleClick={handleDoubleClickZoom}
            onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
            onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={(e) =>
              startDrag(e.touches[0].clientX, e.touches[0].clientY)
            }
            onTouchMove={(e) =>
              moveDrag(e.touches[0].clientX, e.touches[0].clientY)
            }
            onTouchEnd={endDrag}
          >
            <img
              key={activeFloor.image}
              src={activeFloor.image}
              alt={`High resolution architectural layout for ${type.type}, ${activeFloor.name}`}
              draggable={false}
              className="max-h-[62vh] w-auto max-w-full select-none rounded-xl object-contain transition-transform duration-150 ease-out"
              style={{
                transform: `scale(${zoomScale}) translate(${zoomPos.x / zoomScale}px, ${
                  zoomPos.y / zoomScale
                }px)`,
                cursor:
                  zoomScale > 1
                    ? dragRef.current.dragging
                      ? "grabbing"
                      : "grab"
                    : "zoom-in",
              }}
            />
          </div>

          {/* In-lightbox floor switcher — compare levels without closing the view */}
          <div
            role="radiogroup"
            aria-label="Switch floor level"
            className="relative z-10 mt-5 flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-1.5 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            {FLOORS.map((f) => {
              const isActive = floor === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setFloor(f.key)}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-mono text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-cyan text-navy shadow-md"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{f.label}</span>
                  <span className="hidden uppercase tracking-wider opacity-70 sm:inline">
                    {f.code}
                  </span>
                </button>
              );
            })}
            <div className="mx-1 hidden h-5 w-px bg-white/15 sm:block" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 sm:inline">
              ← / → floors &middot; scroll or +/- to zoom &middot; drag to pan
            </span>
          </div>
        </div>
      )}
    </section>
  );
});

FloorPlans.displayName = "FloorPlans";

/** Specification Badge Component */
function SpecChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<LucideProps>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/5 text-navy border border-navy/10">
        <Icon className="h-4 w-4 text-navy/80" strokeWidth={2} />
      </div>
      <div className="leading-tight">
        <div className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-navy/50">
          {label}
        </div>
        <div className="text-[12px] font-bold text-navy">{value}</div>
      </div>
    </div>
  );
}