export default function MarqueeStrip() {
  const words = [
    "Building Tomorrow with Precision",
    "Construction",
    "Infrastructure",
    "Engineering",
    "Real Estate Development",
  ];
  const items = [...words, ...words];

  return (
    <div className="bg-navy overflow-hidden py-4">
      <div className="flex gap-16 whitespace-nowrap w-max animate-scrollX">
        {items.map((w, i) => (
          <span
            key={i}
            className="font-mono text-[13px] tracking-[.18em] uppercase text-white/55"
          >
            {w} <b className="text-cyan font-medium">—</b>
          </span>
        ))}
      </div>
    </div>
  );
}
