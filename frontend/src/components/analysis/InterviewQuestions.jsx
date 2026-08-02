import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function InterviewQuestions({ questions }) {
  if (!questions || typeof questions !== "object") {
    return null;
  }

  const [openQuestion, setOpenQuestion] = useState(null);

  const difficultyConfig = {
    easy: {
      title: "Easy",
      color: "text-emerald-300",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    medium: {
      title: "Medium",
      color: "text-amber-300",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    hard: {
      title: "Hard",
      color: "text-rose-300",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
    behavioral: {
      title: "Behavioral",
      color: "text-teal-300",
      bg: "bg-teal-500/10",
      border: "border-teal-500/20",
    },
    project: {
      title: "Project",
      color: "text-cyan-300",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
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
    <div className="bg-card rounded-3xl shadow-sm border border-border overflow-hidden mt-8">
      <div className="px-8 py-6 border-b border-border flex items-center justify-between">
        <h2 className="font-display text-3xl font-bold text-foreground">
          AI Interview Questions
        </h2>

        <span className="text-muted-foreground text-sm">
          {totalQuestions} Questions
        </span>
      </div>

      <div className="p-8 space-y-8">
        {sections.map(([difficulty, list]) => {
          const config =
            difficultyConfig[difficulty.toLowerCase()] || {
              title: difficulty,
              color: "text-cyan-300",
              bg: "bg-cyan-500/10",
              border: "border-cyan-500/20",
            };

          return (
            <div key={difficulty}>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold mb-4 ${config.bg} ${config.color}`}
              >
                <span>
                  {config.title} ({list.length})
                </span>
              </div>

              <div className="space-y-3">
                {list.map((question, index) => {
                  const id = `${difficulty}-${index}`;

                  return (
                    <div
                      key={id}
                      className={`border rounded-xl ${config.border}`}
                    >
                      <button
                        onClick={() =>
                          setOpenQuestion(
                            openQuestion === id ? null : id
                          )
                        }
                        className="w-full flex justify-between items-center text-left px-5 py-4 hover:bg-gray-50 transition"
                      >
                        <span className="font-medium text-gray-800">
                          {question}
                        </span>

                        {openQuestion === id ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </button>

                      <AnimatePresence>
                        {openQuestion === id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 text-gray-600 text-sm">
                              Practice answering this question using the STAR
                              method and include examples from your projects,
                              internships, or real experience.
                            </div>
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
