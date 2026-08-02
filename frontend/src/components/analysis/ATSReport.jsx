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
        color: "text-emerald-400",
        badge: "bg-emerald-500/15 text-emerald-300",
      };

    if (score >= 70)
      return {
        text: "Good • Minor Improvements Recommended",
        color: "text-amber-400",
        badge: "bg-amber-500/15 text-amber-300",
      };

    return {
      text: "Needs Improvement",
      color: "text-rose-400",
      badge: "bg-rose-500/15 text-rose-300",
    };
  };

  const status = getStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
    >
      {/* Header */}

      <div className="border-b border-border bg-secondary px-6 py-5 text-foreground flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={22} className="text-emerald-400" />

            <h2 className="font-display text-xl font-bold">
              ATS Compatibility
            </h2>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
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

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">

            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-emerald-300">
              <CheckCircle2 size={20} />
              Strengths
            </h3>

            <div className="space-y-3">
              {strengths.length > 0 ? (
                strengths.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 text-emerald-400 flex-shrink-0"
                    />

                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No strengths identified.
                </p>
              )}
            </div>

          </div>

          {/* Improvements */}

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">

            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-300">
              <AlertTriangle size={20} />
              Improvements
            </h3>

            <div className="space-y-3">
              {improvements.length > 0 ? (
                improvements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <AlertTriangle
                      size={16}
                      className="mt-0.5 text-amber-400 flex-shrink-0"
                    />

                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No major improvements required.
                </p>
              )}
            </div>

          </div>

        </div>

        {/* AI Summary */}

        <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-5">

          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-teal-300">
            <Sparkles size={20} />
            AI Summary
          </h3>

          <p className="text-sm leading-7 text-foreground/80">
            {report.feedback}
          </p>

        </div>

      </div>
    </motion.div>
  );
}

export default ATSReport;
