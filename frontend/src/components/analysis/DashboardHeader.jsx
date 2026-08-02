import { CheckCircle2, Download, RotateCcw, FileText, ShieldCheck } from "lucide-react";
import generatePDF from "../../utils/generatePDF";

function DashboardHeader({ analysis }) {
  const overall = Math.round(analysis?.overall_score || 0);
  const atsScore = Math.round(analysis?.ats_report?.ats_score || overall);
  const missingSkills = analysis?.keyword_analysis?.missing_skills || [];
  const filename = analysis?.filename || "Uploaded_Resume.pdf";
  const readyForATS = atsScore >= 70;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl glow-indigo">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Column: Metadata */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2 size={12} />
              <span>Analysis Complete</span>
            </span>

            <span className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
              readyForATS
                ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
                : "border-amber-500/30 bg-amber-500/10 text-amber-300"
            }`}>
              <ShieldCheck size={12} />
              <span>{readyForATS ? "Ready for ATS Applications" : "ATS Revision Recommended"}</span>
            </span>
          </div>

          <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Resume Match & ATS Compatibility Audit
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-300">
              <FileText size={14} className="text-indigo-400" />
              <span className="font-semibold text-white">{filename}</span>
            </div>

            {missingSkills.length > 0 && (
              <div className="flex items-center gap-1">
                <span>Missing Key Skills:</span>
                <span className="font-semibold text-rose-400">{missingSkills.slice(0, 3).join(", ")}</span>
                {missingSkills.length > 3 && (
                  <span className="text-[10px] text-slate-400">+{missingSkills.length - 3} more</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Score Gauge & Actions */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2.5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Overall Score
              </span>
              <span className="text-2xl font-black text-white">
                {overall}%
              </span>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                ATS Format Score
              </span>
              <span className="text-2xl font-black text-emerald-400">
                {atsScore}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => generatePDF(analysis)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-indigo-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <Download size={14} />
              <span>Export PDF Report</span>
            </button>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700"
              title="Reset and start new analysis"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;