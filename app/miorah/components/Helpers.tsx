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

export function InfoTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-secondary p-6">
      <div className="font-display text-3xl font-bold text-navy">{value}</div>
      <div className="mt-2 text-sm text-ink-muted">{label}</div>
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