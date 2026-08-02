import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: "📤", title: "Uploading Resume Document..." },
  { icon: "📄", title: "Extracting Text & Structural Elements..." },
  { icon: "🤖", title: "Analyzing Resume with Groq AI..." },
  { icon: "🎯", title: "Running Vector Skill Similarity Match..." },
  { icon: "📊", title: "Calculating ATS Readability & Format Score..." },
  { icon: "💡", title: "Generating Strategic AI Recommendations..." },
  { icon: "🎤", title: "Creating Role-Specific Practice Interview Questions..." },
  { icon: "📚", title: "Building 4-Week Custom Learning Roadmap..." },
  { icon: "✨", title: "Finalizing Executive Analysis Dashboard..." },
];

function AnalysisLoader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const progress = Math.round(((step + 1) / steps.length) * 100);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl glow-indigo max-w-2xl mx-auto mt-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-md">
            <Cpu size={20} className="animate-pulse" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Groq AI Resume Engine</span>
              <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                Llama-3.3-70b
              </span>
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              Executing deep ATS formatting & semantic vector analysis...
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-emerald-400 tracking-tight">
            {progress}%
          </span>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Completed
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-850">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Current Step Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-xl shrink-0">
              {steps[step].icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-0.5">
                <span>Step {step + 1} of {steps.length}</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 size={12} />
                  <span>Processing</span>
                </span>
              </div>

              <h3 className="text-xs font-bold text-white truncate">
                {steps[step].title}
              </h3>

              <p className="text-[11px] text-slate-400 mt-0.5">
                Estimated time remaining: ~{Math.max(1, Math.round((steps.length - step) * 1.8))}s
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AnalysisLoader;