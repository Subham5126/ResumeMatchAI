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
import { downloadPDF } from "../utils/pdfGenerator";
import { downloadDOCX } from "../utils/docxGenerator";

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
    } catch (err) {
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
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-2xl bg-blue-100 p-3">
          <FileText className="text-blue-600" size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            AI Cover Letter
          </h2>
          <p className="text-slate-500">
            Generate a personalized cover letter for this job.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Tone Selection */}
        <div>
          <label htmlFor="tone-select" className="mb-2 block text-sm font-semibold text-slate-700">
            Tone
          </label>
          <div className="relative">
            <select
              id="tone-select"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-300 px-4 py-3 pr-12 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              {tones.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={20}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
        </div>

        {/* Length Selection */}
        <div>
          <label htmlFor="length-select" className="mb-2 block text-sm font-semibold text-slate-700">
            Length
          </label>
          <div className="relative">
            <select
              id="length-select"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-300 px-4 py-3 pr-12 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              {lengths.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={20}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateCoverLetter}
        disabled={loading || !analysis}
        className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-7 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
      >
        {loading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Generate Cover Letter
          </>
        )}
      </button>

      {/* Output Section */}
      {coverLetter && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                📝 AI Cover Letter
              </h3>
              <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Generated Successfully
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Copy Button */}
              <button
                onClick={copyText}
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {copied ? (
                  <>
                    <Check size={18} className="text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy
                  </>
                )}
              </button>

              {/* PDF Button */}
              <button
                onClick={downloadCoverLetterPDF}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
              >
                <FileDown size={18} />
                PDF
              </button>

              {/* DOCX Button */}
              <button
                onClick={downloadCoverLetterDOCX}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
              >
                <FileText size={18} />
                DOCX
              </button>

              {/* Regenerate Button */}
              <button
                onClick={generateCoverLetter}
                disabled={loading || !analysis}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                <RotateCw size={18} 
                className={loading ? "animate-spin" : ""}
                 />
                {loading ? "Generating..." : "Generate Again"}
                
              </button>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            aria-label="Cover Letter Content"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="min-h-[350px] w-full resize-none rounded-xl border border-slate-200 bg-white p-5 leading-8 text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      )}
    </div>
  );
}

export default CoverLetter;