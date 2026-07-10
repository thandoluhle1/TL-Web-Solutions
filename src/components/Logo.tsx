type LogoProps = {
  variant?: "horizontal" | "icon" | "stacked";
  className?: string;
  iconSize?: number;
};

export function TLLogo({ variant = "horizontal", className = "", iconSize = 40 }: LogoProps) {
  // Simple, clean "TL" wordmark that matches the site's typography.
  const fontSize = Math.round(iconSize * 0.62);

  const mark = (
    <span
      aria-label="TL Web Solutions"
      className="font-extrabold leading-none tracking-tight text-white"
      style={{ fontSize }}
    >
      T<span className="text-sky-400">L</span>
    </span>
  );

  if (variant === "icon") {
    return <span className={`inline-flex ${className}`}>{mark}</span>;
  }

  if (variant === "stacked") {
    return (
      <span className={`inline-flex flex-col items-center gap-1 ${className}`}>
        {mark}
        <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-slate-400">
          Web Solutions
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      {mark}
      <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">
        Web Solutions
      </span>
    </span>
  );
}
