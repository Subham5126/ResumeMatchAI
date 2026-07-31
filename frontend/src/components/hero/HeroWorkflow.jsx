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
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
      }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl"
    >
      {/* Header */}

      <div className="mb-5">

        <h2 className="text-xl font-bold text-slate-900">
          ResumeMatch AI
        </h2>

        <p className="text-sm text-slate-500">
          AI Resume Analysis Workflow
        </p>

      </div>

      {/* Steps */}

      <div className="space-y-3">

        {steps.map((step) => (

          <motion.div
            key={step.title}
            whileHover={{
              x: 4,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
          >

            <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white">

              {step.icon}

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="text-xs text-slate-500">
                {step.subtitle}
              </p>

            </div>

          </motion.div>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-5 rounded-xl bg-blue-50 p-3 text-center">

        <p className="text-sm font-medium text-blue-700">
          ⚡ Complete analysis in under 5 seconds
        </p>

      </div>

    </motion.div>
  );
}