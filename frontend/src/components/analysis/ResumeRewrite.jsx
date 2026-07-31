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
import { downloadDOCX } from "../utils/docxGenerator";
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
  <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

    {/* Header */}

    <div className="mb-8 flex items-center gap-4">

      <div className="rounded-2xl bg-violet-100 p-3">
        <Sparkles
          size={24}
          className="text-violet-600"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Resume Rewrite
        </h2>

        <p className="text-slate-500">
          Improve your resume with AI while keeping the original meaning.
        </p>
      </div>

    </div>

    {/* Dropdown */}

    <div className="max-w-lg">

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Select Section
      </label>

      <div className="relative">

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-700 shadow-sm transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
        >
          {sections.map((section) => (
            <option
              key={section.value}
              value={section.value}
            >
              {section.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={20}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

      </div>

    </div>

    {/* Rewrite Button */}

    <div className="mt-6">

      <button
        onClick={handleRewrite}
        disabled={loading || !analysis}
        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Rewriting...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Rewrite with AI
          </>
        )}
      </button>

    </div>

    {/* Result */}

    {rewrittenText && (

      <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h3 className="text-xl font-bold text-slate-900">
              ✨ Improved {selectedLabel}
            </h3>

            <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              AI Rewrite Complete
            </span>

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-3">

            {/* Copy */}

            <button
              onClick={copyText}
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy
                </>
              )}
            </button>

            {/* Download PDF */}

            <button
              onClick={downloadResumePDF}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <FileDown size={18} />
              Download PDF
            </button>
            
            {/* Download DOCX */}
            <button
                onClick={downloadResumeDOCX}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                <FileText size={18} />
                DOCX
            </button>

            {/* Rewrite Again */}

            <button
              onClick={handleRewrite}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-60"
            >
              <RotateCw size={18} />
              Rewrite Again
            </button>

          </div>

        </div>

        <textarea
          id="rewriteTextarea"
          value={rewrittenText}
          onChange={(e) => setRewrittenText(e.target.value)}
          className="min-h-[300px] w-full resize-none rounded-xl border border-slate-200 bg-white p-5 leading-8 text-slate-700 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
        />

      </div>

    )}

  </div>
);

}

export default ResumeRewrite;