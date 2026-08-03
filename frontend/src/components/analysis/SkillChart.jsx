function SkillChart({ matched = [], missing = [] }) {
  const total = matched.length + missing.length;
  if (total === 0) return null;

  const matchPct = Math.round((matched.length / total) * 100);

  // Build rows: matched first (capped at 8), then missing (capped at 6)
  const matchedRows = matched.slice(0, 8).map((skill) => ({
    skill,
    pct: 100,
    type: "matched",
  }));

  const missingRows = missing.slice(0, 6).map((skill) => ({
    skill,
    pct: 0,
    type: "missing",
  }));

  const rows = [...matchedRows, ...missingRows];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div>
          <h2 className="text-base font-bold text-white">Keyword Coverage Chart</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Visual breakdown of matched vs. missing job keywords
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500 inline-block" />
            Matched ({matched.length})
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="h-2.5 w-2.5 rounded-sm bg-rose-500/60 inline-block" />
            Missing ({missing.length})
          </span>
        </div>
      </div>

      {/* Overall coverage bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1.5">
          <span>Overall Coverage</span>
          <span className="text-emerald-400">{matchPct}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-950">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
            style={{ width: `${matchPct}%` }}
          />
        </div>
      </div>

      {/* Per-skill bar chart */}
      <div className="space-y-2">
        {rows.map(({ skill, type }) => (
          <div key={`${type}-${skill}`} className="flex items-center gap-3 group">
            {/* Skill label */}
            <span
              className="w-32 shrink-0 truncate text-xs font-medium text-slate-300"
              title={skill}
            >
              {skill}
            </span>

            {/* Bar track */}
            <div className="flex-1 h-5 overflow-hidden rounded-md bg-slate-950 relative">
              <div
                className={`h-full rounded-md transition-all duration-700 flex items-center px-2 ${
                  type === "matched"
                    ? "bg-gradient-to-r from-emerald-500/80 to-teal-500/70 w-full"
                    : "bg-rose-500/20 border border-rose-500/30 w-full"
                }`}
              >
                <span
                  className={`text-[10px] font-bold ${
                    type === "matched" ? "text-emerald-100" : "text-rose-400"
                  }`}
                >
                  {type === "matched" ? "✓ Present" : "✗ Missing"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(matched.length > 8 || missing.length > 6) && (
        <p className="mt-3 text-center text-[11px] text-slate-500">
          Showing top {Math.min(matched.length, 8)} matched + {Math.min(missing.length, 6)} missing keywords
        </p>
      )}
    </div>
  );
}

export default SkillChart;
