import Image from "next/image";
import { leadership } from "@/data/content";

export default function Leadership() {
  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Leadership</p>
          <h2>The people behind SriZen</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {leadership.map((l) => (
            <div key={l.name} className="group">
              <div className="relative aspect-square rounded-md overflow-hidden">
                <Image
                  src={l.photo}
                  alt={l.name}
                  fill
                  className="object-cover grayscale transition-all duration-500 ease-premium group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <h4 className="mt-4 font-semibold text-[15px]">{l.name}</h4>
              <p className="text-[13.5px] text-ink-muted mt-0.5">{l.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
