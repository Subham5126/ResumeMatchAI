import { motion, AnimatePresence } from "framer-motion";
import {
  FaBookOpen,
  FaGlobe,
  FaRocket,
  FaChevronRight,
} from "react-icons/fa";

export default function RoadmapWeek({
  week,
  index,
  expanded,
  onToggle,
}) {
  return (
    <div className="relative pl-8">
      {/* Timeline */}
      {index !== 0 && (
        <div className="absolute left-3 -top-4 h-4 w-[2px] bg-slate-800" />
      )}

      <div className="absolute left-1.5 top-4 h-3 w-3 rounded-full border-2 border-slate-900 bg-indigo-500 shadow-md" />

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
        {/* Header */}
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-950 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-bold text-indigo-300">
              Week {week.week}
            </span>

            <h3 className="text-xs font-bold text-white">
              {week.title || week.topics?.[0]}
            </h3>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronRight className="text-slate-400 text-xs" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-slate-800 bg-slate-900/60"
            >
              <div className="p-4 space-y-4">
                {/* Topics */}
                <div>
                  <div className="mb-2 flex items-center gap-1.5">
                    <FaBookOpen className="text-emerald-400 text-xs" />
                    <h4 className="font-bold text-slate-300 text-xs">
                      Focus Learning Topics
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {week.topics?.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                {week.resources?.length > 0 && (
                  <div>
                    <div className="mb-2 flex items-center gap-1.5">
                      <FaGlobe className="text-indigo-400 text-xs" />
                      <h4 className="font-bold text-slate-300 text-xs">
                        Recommended Resources
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {week.resources?.map((resource) => (
                        <span
                          key={resource}
                          className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-300"
                        >
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project */}
                {week.project && (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <FaRocket className="text-amber-400 text-xs" />
                      <h4 className="font-bold text-amber-300 text-xs">
                        Hands-on Milestone Project
                      </h4>
                    </div>

                    <p className="text-xs leading-relaxed text-slate-200">
                      {week.project}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}