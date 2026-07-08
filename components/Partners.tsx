import { partners } from "@/data/content";

export default function Partners() {
  const items = [...partners, ...partners];

  return (
    <section className="pt-16 pb-24 md:pb-32">
      <div className="wrap">
        <p className="eyebrow justify-center text-center">Trusted By</p>
        <div className="overflow-hidden mt-10">
          <div className="flex gap-20 w-max items-center animate-scrollX">
            {items.map((p, i) => (
              <span
                key={i}
                className="font-display font-bold text-xl text-ink-muted tracking-[-0.02em] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:text-navy transition-all duration-300 whitespace-nowrap"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
