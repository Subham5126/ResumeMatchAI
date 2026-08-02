import { useState, useEffect } from "react";
import {
  Sparkles,
  Copy,
  Check,
  ChevronDown,
  RotateCw,
  FileDown,
} from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { downloadPDF } from "../../utils/pdfGenerator";
import { FileText } from "lucide-react";
import { downloadDOCX } from "../../utils/docxGenerator";
const sections = [
  { value: "summary", label: "Professional Summary" },
  { value: "projects", label: "Projects" },
  { value: "experience", label: "Experience" },
  { value: "skills", label: "Skills" },
  { value: "education", label: "Education" },
  { value: "entire_resume", label: "Entire Resume" },
];

function ResumeRewrite({ analysis }) {
  const [selectedSection, setSelectedSection] = useState("summary");
  const [loading, setLoading] = useState(false);
  const [rewrittenText, setRewrittenText] = useState("");
  const [copied, setCopied] = useState(false);
  const downloadResumeDOCX = async () => {
    if (!rewrittenText) return;

    await downloadDOCX(
        `Improved ${selectedLabel}`,
        rewrittenText
    );

    toast.success("DOCX downloaded successfully!");
  };
  const selectedLabel =
    sections.find((s) => s.value === selectedSection)?.label || "Resume";

  const handleRewrite = async () => {
    if (!analysis) return;

    setLoading(true);

    try {
      const response = await api.post("/rewrite/", {
        section: selectedSection,
        analysis,
        job_description: analysis?.job?.job_description || "",
      });

      setRewrittenText(response.data.rewritten_text);

      toast.success("Resume rewritten successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to rewrite section.");
    } finally {
      setLoading(false);
    }
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(rewrittenText);

    toast.success("Copied to clipboard!");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadResumePDF = () => {
    if (!rewrittenText) return;

    downloadPDF(
      `Improved ${selectedLabel}`,
      rewrittenText
    );

    toast.success("PDF downloaded successfully!");
  };

  useEffect(() => {
    const textarea = document.getElementById("rewriteTextarea");

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height =
        textarea.scrollHeight + "px";
    }
  }, [rewrittenText]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-2xs">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              AI Resume Section Rewriter
            </h2>
            <p className="text-xs text-slate-400">
              Optimize resume phrasing for target keywords without changing factual details.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Powered by Groq LLM
        </span>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 pr-10 text-xs font-semibold text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {sections.map((section) => (
              <option key={section.value} value={section.value}>
                {section.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        <button
          type="button"
          onClick={handleRewrite}
          disabled={loading || !analysis}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-indigo-500 transition-all disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Generating AI Rewrite...</span>
            </>
          ) : (
            <>
              <Sparkles size={14} className="text-amber-300" />
              <span>Rewrite {selectedLabel}</span>
            </>
          )}
        </button>
      </div>

      {/* Rewritten Output */}
      {rewrittenText && (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-850 pb-3 gap-3">
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
                ✓ Improved {selectedLabel}
              </span>
              <span className="text-xs text-slate-400">Editable preview below</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={copyText}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>

              <button
                type="button"
                onClick={downloadResumePDF}
                className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors"
              >
                <FileDown size={14} />
                <span>PDF</span>
              </button>

              <button
                type="button"
                onClick={downloadResumeDOCX}
                className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-colors"
              >
                <FileText size={14} />
                <span>DOCX</span>
              </button>

              <button
                type="button"
                onClick={handleRewrite}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <RotateCw size={14} />
                <span>Regenerate</span>
              </button>
            </div>
          </div>

          <textarea
            id="rewriteTextarea"
            value={rewrittenText}
            onChange={(e) => setRewrittenText(e.target.value)}
            className="min-h-[200px] w-full resize-y rounded-lg border border-slate-800 bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      )}
    </div>
  );

}

export default ResumeRewrite;