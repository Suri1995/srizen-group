import Link from "next/link";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  crumb: string;
}

export default function PageHero({ eyebrow, title, subtitle, image, crumb }: PageHeroProps) {
  return (
    <section className="relative min-h-[420px] flex items-end pt-32 pb-16 text-white overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(0,7,46,.75) 0%, rgba(0,7,46,.88) 100%), url('${image}') center/cover`,
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 20% 30%, black, transparent 70%)",
        }}
      />
      <div className="wrap relative z-[1]">
        <div className="flex items-center gap-2 text-[13px] text-white/50 font-mono mb-6">
          <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/75">{crumb}</span>
        </div>
        <p className="eyebrow eyebrow-on-dark">{eyebrow}</p>
        <h1 className="text-[38px] md:text-[58px] max-w-[18ch]">{title}</h1>
        {subtitle && (
          <p className="mt-6 text-[17px] leading-relaxed text-white/65 max-w-[560px]">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
