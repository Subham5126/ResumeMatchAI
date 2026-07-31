import { motion, AnimatePresence } from "framer-motion";
import {
  FaBookOpen,
  FaGlobe,
  FaRocket,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

export default function RoadmapWeek({
  week,
  index,
  expanded,
  onToggle,
}) {
  return (
    <div className="relative pl-10">
      {/* Timeline */}
      {index !== 0 && (
        <div className="absolute left-4 -top-5 h-5 w-[2px] bg-slate-300" />
      )}

      <div className="absolute left-2 top-5 h-4 w-4 rounded-full border-4 border-white bg-blue-600 shadow-md" />

      <motion.div
        layout
        whileHover={{
          y: -2,
          boxShadow: "0 12px 30px rgba(37,99,235,.12)",
        }}
        transition={{ duration: 0.2 }}
        className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white"
      >
        {/* Header */}
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between px-5 py-4 text-left"
        >
          <div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Week {week.week}
            </span>

            <h3 className="mt-2 text-lg font-semibold text-slate-800">
              {week.title || week.topics?.[0]}
            </h3>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronRight className="text-slate-400 text-lg" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="overflow-hidden"
            >
              <div className="border-t border-slate-100 px-5 py-4 space-y-5">

                {/* Topics */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <FaBookOpen className="text-green-600 text-sm" />
                    <h4 className="font-semibold text-slate-700 text-sm">
                      Topics
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {week.topics?.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <FaGlobe className="text-indigo-600 text-sm" />
                    <h4 className="font-semibold text-slate-700 text-sm">
                      Resources
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {week.resources?.map((resource) => (
                      <span
                        key={resource}
                        className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project */}
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <FaRocket className="text-orange-500 text-sm" />

                    <h4 className="font-semibold text-orange-700 text-sm">
                      Mini Project
                    </h4>
                  </div>

                  <p className="text-sm leading-6 text-slate-700">
                    {week.project}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}