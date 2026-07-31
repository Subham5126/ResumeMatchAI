import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { icon: "📤", title: "Uploading Resume..." },
  { icon: "📄", title: "Extracting Resume Text..." },
  { icon: "🤖", title: "Analyzing Resume with AI..." },
  { icon: "🎯", title: "Matching Skills..." },
  { icon: "📊", title: "Calculating ATS Score..." },
  { icon: "💡", title: "Generating Recommendations..." },
  { icon: "🎤", title: "Creating Interview Questions..." },
  { icon: "📚", title: "Building Learning Roadmap..." },
  { icon: "✨", title: "Preparing Dashboard..." },
];

function AnalysisLoader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) =>
        prev < steps.length - 1 ? prev + 1 : prev
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-6 max-w-4xl mx-auto">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="text-5xl">
            🤖
          </div>

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              AI Resume Analyzer
            </h2>

            <p className="text-gray-500 text-sm">
              Please wait while we analyze your resume...
            </p>

          </div>

        </div>

        <div className="text-right">

          <p className="text-3xl font-bold text-blue-600">
            {Math.round(progress)}%
          </p>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-6">

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.4,
            }}
          />

        </div>

      </div>

      {/* Current Step */}

      <div className="mt-8 flex justify-center">

        <AnimatePresence mode="wait">

          <motion.div
            key={step}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.3,
            }}
            className="flex items-center gap-4"
          >

            <div className="text-4xl">
              {steps[step].icon}
            </div>

            <div>

              <h3 className="text-xl font-semibold text-gray-800">
                {steps[step].title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Estimated remaining time: 10–20 seconds
              </p>

            </div>

          </motion.div>

        </AnimatePresence>

      </div>

    </div>
  );
}

export default AnalysisLoader;