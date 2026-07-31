import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

function ATSReport({ report }) {
  if (!report) return null;

  const score = Math.round(report.ats_score || 0);

  const strengths = report.passed_checks || [];
  const improvements = [
    ...(report.warnings || []),
    ...(report.failed_checks || []),
  ];

  const getStatus = () => {
    if (score >= 85)
      return {
        text: "Excellent • Ready for Most ATS Systems",
        color: "text-green-600",
        badge: "bg-green-100 text-green-700",
      };

    if (score >= 70)
      return {
        text: "Good • Minor Improvements Recommended",
        color: "text-amber-600",
        badge: "bg-amber-100 text-amber-700",
      };

    return {
      text: "Needs Improvement",
      color: "text-red-600",
      badge: "bg-red-100 text-red-700",
    };
  };

  const status = getStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
    >
      {/* Header */}

      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 text-white flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={22} />

            <h2 className="text-xl font-bold">
              ATS Compatibility
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-300">
            {status.text}
          </p>
        </div>

        <div
          className={`rounded-xl px-5 py-3 text-center ${status.badge}`}
        >
          <div className="text-3xl font-bold">
            {score}%
          </div>

          <div className="text-xs font-semibold">
            ATS Score
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* Strengths + Improvements */}

        <div className="grid gap-5 md:grid-cols-2">

          {/* Strengths */}

          <div className="rounded-xl border border-green-200 bg-green-50 p-5">

            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-700">
              <CheckCircle2 size={20} />
              Strengths
            </h3>

            <div className="space-y-3">
              {strengths.length > 0 ? (
                strengths.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 text-green-500 flex-shrink-0"
                    />

                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No strengths identified.
                </p>
              )}
            </div>

          </div>

          {/* Improvements */}

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">

            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-700">
              <AlertTriangle size={20} />
              Improvements
            </h3>

            <div className="space-y-3">
              {improvements.length > 0 ? (
                improvements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <AlertTriangle
                      size={16}
                      className="mt-0.5 text-amber-500 flex-shrink-0"
                    />

                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No major improvements required 🎉
                </p>
              )}
            </div>

          </div>

        </div>

        {/* AI Summary */}

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-blue-700">
            <Sparkles size={20} />
            AI Summary
          </h3>

          <p className="text-sm leading-7 text-slate-700">
            {report.feedback}
          </p>

        </div>

      </div>
    </motion.div>
  );
}

export default ATSReport;