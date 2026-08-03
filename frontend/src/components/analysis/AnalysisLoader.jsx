import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, FileText, Brain, Target, ShieldCheck,
  Lightbulb, Mic, BookOpen, Sparkles, Clock,
} from "lucide-react";

const STEPS = [
  { icon: Upload,      label: "Uploading Resume",            detail: "Securely transferring your document to the AI engine",        duration: 800  },
  { icon: FileText,    label: "Parsing Document Structure",  detail: "Extracting text, sections & layout from your resume",        duration: 1400 },
  { icon: Brain,       label: "Running AI Resume Analysis",  detail: "LLM identifying roles, skills, experience & achievements",   duration: 2800 },
  { icon: Target,      label: "Semantic Skill Matching",     detail: "Vector-embedding your skills against job requirements",      duration: 2200 },
  { icon: ShieldCheck, label: "ATS Compatibility Audit",     detail: "Scoring formatting, keywords & section completeness",        duration: 1600 },
  { icon: Lightbulb,   label: "Generating Recommendations",  detail: "Crafting personalised action steps to boost your score",     duration: 1800 },
  { icon: Mic,         label: "Building Interview Questions",detail: "Creating role-specific practice questions from your profile", duration: 2000 },
  { icon: BookOpen,    label: "Creating Learning Roadmap",   detail: "Mapping a 4-week skill-gap plan for your target role",      duration: 1800 },
  { icon: Sparkles,    label: "Finalising Dashboard",        detail: "Assembling your complete ATS & career intelligence report",  duration: 600  },
];

const TOTAL_MS = STEPS.reduce((s, st) => s + st.duration, 0);

export default function AnalysisLoader() {
  const [activeStep, setActiveStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const startTime = useRef(null);
  const stepStart  = useRef(null);

  // Global clock
  useEffect(() => {
    startTime.current = Date.now();
    const t = setInterval(
      () => setElapsed(Math.floor((Date.now() - startTime.current) / 1000)),
      500
    );
    return () => clearInterval(t);
  }, []);

  // Per-step timer
  useEffect(() => {
    if (activeStep >= STEPS.length) return;
    stepStart.current = Date.now();
    const duration = STEPS[activeStep].duration;

    const ticker = setInterval(() => {
      const frac = Math.min((Date.now() - stepStart.current) / duration, 1);
      setStepProgress(frac);

      const doneMs = STEPS.slice(0, activeStep).reduce((s, st) => s + st.duration, 0);
      setOverallProgress(Math.min(((doneMs + frac * duration) / TOTAL_MS) * 100, 99));
    }, 40);

    const advance = setTimeout(() => {
      clearInterval(ticker);
      setActiveStep((p) => p + 1);
      setStepProgress(0);
    }, duration);

    return () => { clearInterval(ticker); clearTimeout(advance); };
  }, [activeStep]);

  const step = STEPS[Math.min(activeStep, STEPS.length - 1)];
  const Icon = step.icon;

  const estRemaining = Math.max(
    0,
    Math.round(STEPS.slice(activeStep).reduce((s, st) => s + st.duration, 0) / 1000)
  );

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-4">

      {/* Header row */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Clock size={13} />
          <span>{elapsed}s elapsed</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
          <span>Step {Math.min(activeStep + 1, STEPS.length)} / {STEPS.length}</span>
          <span className="text-indigo-400 font-bold">{Math.round(overallProgress)}%</span>
        </div>
      </div>

      {/* Master progress bar */}
      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400 relative overflow-hidden"
          animate={{ width: `${overallProgress}%` }}
          transition={{ duration: 0.08, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
        </motion.div>
      </div>

      {/* Single step card — swaps with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit   ={{ opacity: 0, y: -20, scale: 0.97 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          className="relative rounded-2xl border border-indigo-500/30 bg-slate-900 shadow-2xl overflow-hidden"
        >
          {/* Top shimmer accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

          <div className="p-6 flex items-start gap-5">
            {/* Icon */}
            <div className="relative shrink-0">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/25 shadow-lg">
                <Icon size={26} className="text-indigo-400" />
              </div>
              {/* Pulsing ring */}
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-indigo-500" />
              </span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="text-base font-bold text-white truncate">{step.label}</h3>
                <span className="shrink-0 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-bold text-indigo-300 animate-pulse">
                  Processing
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{step.detail}</p>

              {/* Step-local progress bar */}
              <div className="mt-4 h-1 w-full rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400"
                  animate={{ width: `${stepProgress * 100}%` }}
                  transition={{ duration: 0.06, ease: "linear" }}
                />
              </div>

              <div className="flex justify-between mt-1 text-[11px] text-slate-500 font-medium">
                <span>~{estRemaining}s remaining</span>
                <span>{Math.round(stepProgress * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Bottom shimmer accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Dot stepper */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {STEPS.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width:   i === activeStep ? 20 : 6,
              opacity: i < activeStep ? 1 : i === activeStep ? 1 : 0.3,
              backgroundColor:
                i < activeStep
                  ? "#34d399"           // emerald — done
                  : i === activeStep
                  ? "#818cf8"           // indigo  — active
                  : "#334155",          // slate   — pending
            }}
            transition={{ duration: 0.25 }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>

      <p className="text-center text-[11px] text-slate-500 font-medium pb-2">
        This usually takes 15–25 seconds · Do not close this tab
      </p>
    </div>
  );
}