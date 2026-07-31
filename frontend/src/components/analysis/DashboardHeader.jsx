import { motion } from "framer-motion";
import {
  CheckCircle,
  Download,
  RotateCcw,
  FileText,
} from "lucide-react";

import generatePDF from "../../utils/generatePDF";

function DashboardHeader({ analysis }) {
  const overall = Math.round(analysis.overall_score || 0);

  const getStatus = () => {
    if (overall >= 85) return "Excellent Match";
    if (overall >= 70) return "Strong Match";
    if (overall >= 50) return "Average Match";
    return "Needs Improvement";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl"
    >
      <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
            <CheckCircle size={18} />
            Analysis Completed
          </div>

          <h1 className="text-3xl font-bold">
            Resume Analysis Report
          </h1>

          <div className="mt-4 flex items-center gap-3 text-blue-100">
            <FileText size={18} />
            <span>
              {analysis.filename || "Uploaded Resume"}
            </span>
          </div>

          <p className="mt-5 max-w-xl text-blue-100">
            Your resume has been analyzed using ATS scoring,
            semantic matching, keyword analysis and AI recommendations.
          </p>

        </div>

        {/* Right */}

        <div className="text-center">

          <div className="text-6xl font-extrabold">
            {overall}%
          </div>

          <p className="mt-2 text-lg font-semibold">
            {getStatus()}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">

            <button
              onClick={() => generatePDF(analysis)}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:scale-105"
            >
              <Download size={18} />
              Download PDF
            </button>

            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
            >
              <RotateCcw size={18} />
              Analyze Again
            </button>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default DashboardHeader;