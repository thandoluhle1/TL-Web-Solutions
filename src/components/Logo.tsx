type LogoProps = {
  variant?: "horizontal" | "icon" | "stacked";
  className?: string;
  iconSize?: number;
};

export function TLLogo({ variant = "horizontal", className = "", iconSize = 40 }: LogoProps) {
  // TL Web Solutions logo with the professional blue mark
  const mark = (
    <svg
      viewBox="0 0 100 100"
      width={iconSize}
      height={iconSize}
      aria-label="TL Web Solutions"
      className="flex-shrink-0"
    >
      {/* Blue TL mark */}
      <g fill="none" fillRule="evenodd">
        {/* T shape - blue gradient */}
        <path
          d="M 20 15 L 50 15 L 50 25 L 42 25 L 42 70 L 28 70 L 28 25 L 20 25 Z"
          fill="url(#tlGradient)"
        />
        {/* L shape - blue */}
        <path
          d="M 58 15 L 72 15 L 72 70 L 58 70 Z"
          fill="url(#tlGradient)"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="tlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066CC" />
            <stop offset="100%" stopColor="#0052A3" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  );

  const textMark = (
    <span className="font-extrabold leading-none tracking-tight text-white" style={{ fontSize: Math.round(iconSize * 0.55) }}>
      TL
    </span>
  );

  if (variant === "icon") {
    return <span className={`inline-flex ${className}`}>{mark}</span>;
  }

  if (variant === "stacked") {
    return (
      <span className={`inline-flex flex-col items-center gap-1.5 ${className}`}>
        {mark}
        <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-slate-400">
          TL Web Solutions
        </span>
      </span>
    );
  }

  // Horizontal variant (default)
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {mark}
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white">TL</span>
        <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-slate-400">Web Solutions</span>
      </span>
    </span>
  );
}
