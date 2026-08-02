import SkillBadge from "./SkillBadge";

function SkillsSection({ matched = [], missing = [] }) {
  const total = matched.length + missing.length;

  const percentage =
    total === 0
      ? 0
      : Math.round((matched.length / total) * 100);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-6 border-b border-slate-800 pb-4">
        <h2 className="text-base font-bold text-white">
          Skills & Keyword Matrix Audit
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Your resume matches{" "}
          <span className="font-bold text-emerald-400">
            {matched.length}
          </span>{" "}
          out of{" "}
          <span className="font-bold text-white">
            {total}
          </span>{" "}
          target job requirements.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-400">
            ✓ Extracted Matched Skills ({matched.length})
          </h3>

          <div className="flex flex-wrap gap-2">
            {matched.length ? (
              matched.map((skill, index) => (
                <SkillBadge
                  key={index}
                  skill={skill}
                  type="matched"
                />
              ))
            ) : (
              <p className="text-xs text-slate-500">
                No matched skills found.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-rose-400">
            ✗ Target Missing Keywords ({missing.length})
          </h3>

          <div className="flex flex-wrap gap-2">
            {missing.length ? (
              missing.map((skill, index) => (
                <SkillBadge
                  key={index}
                  skill={skill}
                  type="missing"
                />
              ))
            ) : (
              <p className="text-xs text-slate-500">
                No missing skills 🎉
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800">
        <div className="mb-2 flex justify-between text-xs font-semibold text-slate-400">
          <span>Overall Skill Vector Coverage</span>
          <span className="text-emerald-400 font-bold">{percentage}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-950">
          <div
            style={{ width: `${percentage}%` }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
}

export default SkillsSection;