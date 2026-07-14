// components/about/CurvedDivider.tsx
/**
 * A curved transition into the section that follows. Pass the fill color
 * of whatever comes next so the curve reads as a seam, not a shape
 * floating on top of the content. Purely decorative — aria-hidden.
 */
export default function CurvedDivider({
  fill = "#FFFFFF",
  className = "",
}: {
  fill?: string;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-[70px] w-full sm:h-[100px]"
      >
        <path
          d="M0,64 C240,120 480,0 720,32 C960,64 1200,120 1440,48 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}