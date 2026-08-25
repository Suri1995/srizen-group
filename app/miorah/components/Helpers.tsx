import { LucideIcon } from "lucide-react";

export function Stat({ value, label, light }: { value: string; label: string; light?: boolean }) {
  return (
    <div>
      <div className={`font-display text-3xl font-bold ${light ? "text-white" : "text-navy"}`}>
        {value}
      </div>
      <div className={`mt-1 font-mono text-[11px] uppercase tracking-[.15em] ${light ? "text-white/55" : "text-ink-muted"}`}>
        {label}
      </div>
    </div>
  );
}

interface InfoTileProps {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export function InfoTile({ value, label, icon: Icon }: InfoTileProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-secondary p-6 transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_16px_32px_-12px_rgba(16,24,63,0.14)]">
      {/* subtle corner accent */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-navy/[0.03] transition-colors group-hover:bg-navy/[0.06]" />

      {Icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
      )}

      <div className="font-display text-3xl font-bold leading-none text-navy">
        {value}
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase leading-snug tracking-[.1em] text-ink-muted">
        {label}
      </div>
    </div>
  );
}

export function SpecMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary p-4">
      <div className="font-mono text-[11px] uppercase tracking-[.1em] text-ink-muted">{label}</div>
      <div className="mt-1 font-semibold text-navy">{value}</div>
    </div>
  );
}