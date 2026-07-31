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
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "🟢",
    },
    medium: {
      title: "Medium",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: "🟡",
    },
    hard: {
      title: "Hard",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "🔴",
    },
    behavioral: {
      title: "Behavioral",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      icon: "💬",
    },
    project: {
      title: "Project",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "🚀",
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
    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mt-8">
      <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          🎤 AI Interview Questions
        </h2>

        <span className="text-gray-500 text-sm">
          {totalQuestions} Questions
        </span>
      </div>

      <div className="p-8 space-y-8">
        {sections.map(([difficulty, list]) => {
          const config =
            difficultyConfig[difficulty.toLowerCase()] || {
              title: difficulty,
              color: "text-blue-600",
              bg: "bg-blue-50",
              border: "border-blue-200",
              icon: "📘",
            };

          return (
            <div key={difficulty}>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold mb-4 ${config.bg} ${config.color}`}
              >
                <span>{config.icon}</span>
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