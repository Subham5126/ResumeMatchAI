import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function InterviewQuestions({ questions }) {
  const [openQuestion, setOpenQuestion] = useState(null);

  if (!questions || typeof questions !== "object") {
    return null;
  }

  const difficultyConfig = {
    easy: {
      title: "Easy",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
    },
    medium: {
      title: "Medium",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/30",
    },
    hard: {
      title: "Hard",
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/30",
    },
    behavioral: {
      title: "Behavioral",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/30",
    },
    project: {
      title: "Project",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/30",
    },
  };

  const sections = Object.entries(questions).filter(
    ([, value]) => Array.isArray(value) && value.length > 0
  );

  if (sections.length === 0) {
    return null;
  }

  const totalQuestions = sections.reduce(
    (total, [, value]) => total + value.length,
    0
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-white">
            AI Technical & Behavioral Interview Practice
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Role-tailored interview preparation bank categorized by difficulty level.
          </p>
        </div>

        <span className="rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-bold text-slate-300">
          {totalQuestions} Questions
        </span>
      </div>

      <div className="space-y-6">
        {sections.map(([difficulty, list]) => {
          const config =
            difficultyConfig[difficulty.toLowerCase()] || {
              title: difficulty,
              color: "text-indigo-400",
              bg: "bg-indigo-500/10 border-indigo-500/30",
            };

          return (
            <div key={difficulty}>
              <div className="mb-3 flex items-center gap-2">
                <span className={`rounded-md border px-2.5 py-0.5 text-xs font-bold ${config.bg} ${config.color}`}>
                  {config.title} ({list.length})
                </span>
              </div>

              <div className="space-y-2">
                {list.map((question, index) => {
                  const id = `${difficulty}-${index}`;

                  return (
                    <div
                      key={id}
                      className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenQuestion(openQuestion === id ? null : id)}
                        className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-950 transition-colors"
                      >
                        <span className="text-xs font-semibold text-slate-200 pr-3">
                          {question}
                        </span>
                        {openQuestion === id ? (
                          <ChevronDown size={16} className="text-indigo-400 shrink-0" />
                        ) : (
                          <ChevronRight size={16} className="text-slate-500 shrink-0" />
                        )}
                      </button>

                      <AnimatePresence>
                        {openQuestion === id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-slate-800 bg-slate-900/60 p-3.5 text-xs leading-relaxed text-slate-300"
                          >
                            <span className="font-bold text-indigo-400 block mb-1">STAR Method Practice Tip:</span>
                            Structure your response with: <strong className="text-white">Situation</strong>, <strong className="text-white">Task</strong>, <strong className="text-white">Action</strong>, and quantitative <strong className="text-white">Result</strong> metric.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InterviewQuestions;