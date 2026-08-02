import { motion } from "framer-motion";
import {
  FaFileUpload,
  FaBriefcase,
  FaRobot,
  FaChartBar,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaFileUpload />,
    title: "Upload Resume",
    subtitle: "PDF • DOC • DOCX",
  },
  {
    icon: <FaBriefcase />,
    title: "Paste Job Description",
    subtitle: "Any Job Role",
  },
  {
    icon: <FaRobot />,
    title: "AI Analysis",
    subtitle: "ATS • Skills • Semantic Match",
  },
  {
    icon: <FaChartBar />,
    title: "Smart Report",
    subtitle: "Score • Roadmap • Interview",
  },
];

export default function HeroWorkflow() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
      className="relative rounded-3xl border border-border bg-card/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm"
    >
      {/* Glow ring */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-emerald-400/20 via-transparent to-teal-400/10" />

      <div className="relative">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              ResumeMatch AI
            </h2>
            <p className="text-sm text-muted-foreground">
              AI Resume Analysis Workflow
            </p>
          </div>
          <span className="flex h-3 w-3">
            <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
          </span>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step) => (
            <motion.div
              key={step.title}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-elevated p-3"
            >
              <div className="rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 p-3 text-primary-foreground">
                {step.icon}
              </div>

              <div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-center">
          <p className="text-sm font-medium text-emerald-300">
            Complete analysis in under 5 seconds
          </p>
        </div>
      </div>
    </motion.div>
  );
}
