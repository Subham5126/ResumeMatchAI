import { ShieldCheck, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

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
        text: "Pass • Formatted for Top Applicant Tracking Systems",
        badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      };

    if (score >= 70)
      return {
        text: "Moderate • Minor Formatting Revisions Suggested",
        badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      };

    return {
      text: "Action Needed • Reformatting Required",
      badge: "bg-rose-500/10 text-rose-300 border-rose-500/30",
    };
  };

  const status = getStatus();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-2xs">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              ATS Readability & Format Audit
            </h2>
            <p className="text-xs text-slate-400">
              {status.text}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">ATS Compliance:</span>
          <span className={`rounded-md border px-3 py-1 text-sm font-extrabold ${status.badge}`}>
            {score}%
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Checks Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Passed Checks */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Passed Formatting Checks ({strengths.length})</span>
            </h3>

            <div className="space-y-2">
              {strengths.length > 0 ? (
                strengths.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">No passed checks detected.</p>
              )}
            </div>
          </div>

          {/* Actionable Improvements */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <AlertTriangle size={16} className="text-amber-400" />
              <span>Suggested Improvements ({improvements.length})</span>
            </h3>

            <div className="space-y-2">
              {improvements.length > 0 ? (
                improvements.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">No formatting issues detected.</p>
              )}
            </div>
          </div>
        </div>

        {/* AI Audit Feedback */}
        {report.feedback && (
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-white">
              <Sparkles size={14} className="text-indigo-400" />
              <span>Executive ATS Audit Summary</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {report.feedback}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ATSReport;