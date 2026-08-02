import { useState, useEffect, useRef } from "react";
import {
  FileText,
  FileDown,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  RotateCw,
} from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/api";
import { downloadPDF } from "../../utils/pdfGenerator";
import { downloadDOCX } from "../../utils/docxGenerator";

const tones = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "confident", label: "Confident" },
];

const lengths = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

function CoverLetter({ analysis }) {
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [copied, setCopied] = useState(false);

  const textareaRef = useRef(null);

  const generateCoverLetter = async () => {
    if (!analysis) return;

    setLoading(true);

    try {
      const response = await api.post("/cover-letter/", {
        analysis,
        tone,
        length,
      });

      setCoverLetter(response.data.cover_letter);
      toast.success("Cover letter generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  const copyText = async () => {
    if (!coverLetter) return;

    try {
      await navigator.clipboard.writeText(coverLetter);
      toast.success("Copied to clipboard!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy text.");
    }
  };

  const downloadCoverLetterPDF = async () => {
    if (!coverLetter) return;

    try {
      await downloadPDF("Cover Letter", coverLetter);
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download PDF.");
    }
  };

  const downloadCoverLetterDOCX = async () => {
    if (!coverLetter) return;

    try {
      await downloadDOCX("Cover Letter", coverLetter);
      toast.success("DOCX downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download DOCX.");
    }
  };

  // Safely auto-resize textarea using React ref
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [coverLetter]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-2xs">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              AI Cover Letter Generator
            </h2>
            <p className="text-xs text-slate-400">
              Generate a tailored cover letter based on your resume and target job requirements.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Tailored Application
        </span>
      </div>

      {/* Controls */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label htmlFor="tone-select" className="mb-1.5 block text-xs font-bold text-slate-300">
            Select Tone
          </label>
          <div className="relative">
            <select
              id="tone-select"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 pr-10 text-xs font-semibold text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {tones.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="length-select" className="mb-1.5 block text-xs font-bold text-slate-300">
            Select Length
          </label>
          <div className="relative">
            <select
              id="length-select"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 pr-10 text-xs font-semibold text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {lengths.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={generateCoverLetter}
        disabled={loading || !analysis}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-indigo-500 transition-all disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        {loading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Generating Cover Letter...</span>
          </>
        ) : (
          <>
            <Sparkles size={14} className="text-amber-300" />
            <span>Generate Custom Cover Letter</span>
          </>
        )}
      </button>

      {/* Output Section */}
      {coverLetter && (
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-850 pb-3 gap-3">
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
                ✓ Generated Cover Letter
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
                onClick={downloadCoverLetterPDF}
                className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors"
              >
                <FileDown size={14} />
                <span>PDF</span>
              </button>

              <button
                type="button"
                onClick={downloadCoverLetterDOCX}
                className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-colors"
              >
                <FileText size={14} />
                <span>DOCX</span>
              </button>

              <button
                type="button"
                onClick={generateCoverLetter}
                disabled={loading || !analysis}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <RotateCw size={14} className={loading ? "animate-spin" : ""} />
                <span>Regenerate</span>
              </button>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            aria-label="Cover Letter Content"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="min-h-[250px] w-full resize-y rounded-lg border border-slate-800 bg-slate-900 p-4 font-sans text-xs leading-relaxed text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      )}
    </div>
  );
}

export default CoverLetter;