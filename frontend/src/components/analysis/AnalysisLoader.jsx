import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Bot,
  Target,
  BarChart3,
  Lightbulb,
  Mic,
  BookOpen,
  Sparkles,
} from "lucide-react";

const steps = [
  { icon: Upload, title: "Uploading Resume..." },
  { icon: FileText, title: "Extracting Resume Text..." },
  { icon: Bot, title: "Analyzing Resume with AI..." },
  { icon: Target, title: "Matching Skills..." },
  { icon: BarChart3, title: "Calculating ATS Score..." },
  { icon: Lightbulb, title: "Generating Recommendations..." },
  { icon: Mic, title: "Creating Interview Questions..." },
  { icon: BookOpen, title: "Building Learning Roadmap..." },
  { icon: Sparkles, title: "Preparing Dashboard..." },
];

function AnalysisLoader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const progress = ((step + 1) / steps.length) * 100;
  const CurrentIcon = steps[step].icon;

  return (
    <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-black/40">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-3 text-primary-foreground">
            <Bot size={28} />
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              AI Resume Analyzer
            </h2>
            <p className="text-sm text-muted-foreground">
              Please wait while we analyze your resume...
            </p>
          </div>
        </div>

        <p className="font-display text-3xl font-bold text-emerald-400">
          {Math.round(progress)}%
        </p>
      </div>

      {/* Progress */}

      <div className="mt-6">
        <div className="h-2 w-full overflow-hidden rounded-full bg-elevated">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Current Step */}

      <div className="mt-8 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-400">
              <CurrentIcon size={26} />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {steps[step].title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
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
