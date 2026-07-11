export function TLLogo({ iconSize = 38 }: { iconSize?: number }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/tlogo.png"
        alt="TL Web Solutions"
        width={iconSize}
        height={iconSize}
        className="object-contain"
      />
      <div className="flex flex-col leading-none">
        <span className="text-sm font-black tracking-[0.15em] text-white">TL</span>
        <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400">WEB SOLUTIONS</span>
      </div>
    </div>
  );
}
