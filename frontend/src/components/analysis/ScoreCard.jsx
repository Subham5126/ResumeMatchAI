function ScoreCard({ title, score = 0 }) {
  const value = Math.round(score);

  const getStatus = () => {
    if (value >= 85) return { label: "Excellent", color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30", bar: "bg-emerald-400" };
    if (value >= 70) return { label: "Strong", color: "text-indigo-300 bg-indigo-500/10 border-indigo-500/30", bar: "bg-indigo-400" };
    if (value >= 50) return { label: "Moderate", color: "text-amber-300 bg-amber-500/10 border-amber-500/30", bar: "bg-amber-400" };
    return { label: "Low Match", color: "text-rose-300 bg-rose-500/10 border-rose-500/30", bar: "bg-rose-400" };
  };

  const status = getStatus();

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md card-hover-effect cursor-pointer">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${status.color}`}>
          {status.label}
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-black text-white tracking-tight">
          {value}%
        </span>
        <span className="text-xs text-slate-400 font-medium">/ 100%</span>
      </div>

      {/* Linear progress gauge */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-950">
        <div
          className={`h-full rounded-full transition-all duration-500 ${status.bar}`}
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

export default ScoreCard;