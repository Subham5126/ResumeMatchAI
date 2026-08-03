import { useState } from "react";
import { Sparkles, Trash2, Briefcase, Link, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import api from "../../services/api";

const SAMPLE_JD = `Senior Full Stack Software Engineer (React / Python)

Responsibilities:
- Design, build, and maintain full-stack web applications using React 19, Python 3.12, and FastAPI.
- Architect scalable REST APIs, microservices, and integrate cloud services on AWS/Docker.
- Write clean, unit-tested code and participate in peer code reviews.
- Collaborate with product managers and designers to craft smooth, responsive user experiences.

Requirements:
- 3+ years of experience with React, TypeScript/JavaScript, and modern Tailwind CSS.
- Proven experience with Python, FastAPI or Django/Flask, and PostgreSQL/Redis.
- Experience with Docker, CI/CD pipelines, and AWS cloud deployment.
- Strong understanding of Git version control, RESTful APIs, and performance tuning.`;

function JobDescription({ jobDescription, setJobDescription }) {
  const [urlInput, setUrlInput] = useState("");
  const [urlStatus, setUrlStatus] = useState(null); // null | "loading" | "success" | "error"
  const [urlError, setUrlError] = useState("");
  const [activeTab, setActiveTab] = useState("paste"); // "paste" | "url"

  const wordCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0;
  const charCount = jobDescription.length;

  const loadSample = () => setJobDescription(SAMPLE_JD);
  const clearText = () => setJobDescription("");

  const isValidUrl = (str) => {
    try {
      const u = new URL(str);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const fetchFromUrl = async () => {
    if (!urlInput.trim()) return;
    if (!isValidUrl(urlInput.trim())) {
      setUrlError("Please enter a valid URL (starting with http:// or https://)");
      setUrlStatus("error");
      return;
    }

    setUrlStatus("loading");
    setUrlError("");

    try {
      const response = await api.post("/job/fetch-url", { url: urlInput.trim() });
      const text = response.data?.text || "";

      if (!text || text.length < 80) {
        throw new Error("Extracted text was too short. Try pasting the job description manually.");
      }

      setJobDescription(text);
      setUrlStatus("success");
      // Switch to paste tab to show the fetched content
      setTimeout(() => setActiveTab("paste"), 800);
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to fetch job description. Please paste it manually.";
      setUrlError(msg);
      setUrlStatus("error");
    }
  };

  const handleUrlKeyDown = (e) => {
    if (e.key === "Enter") fetchFromUrl();
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl h-full flex flex-col justify-between backdrop-blur-md card-hover-effect">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Briefcase size={18} />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white">
            2. Target Job Description
          </h2>
        </div>

        <button
          type="button"
          onClick={loadSample}
          className="inline-flex items-center gap-1.5 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <Sparkles size={14} />
          <span>Load Sample JD</span>
        </button>
      </div>

      {/* Tab Toggle */}
      <div className="flex items-center gap-1 mb-3 rounded-lg border border-slate-800 bg-slate-950/60 p-1 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("paste")}
          className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
            activeTab === "paste"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Paste Text
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
            activeTab === "url"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Link size={12} />
          Fetch from URL
        </button>
      </div>

      {/* URL Fetch Tab */}
      {activeTab === "url" && (
        <div className="space-y-3 mb-3">
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                setUrlStatus(null);
                setUrlError("");
              }}
              onKeyDown={handleUrlKeyDown}
              placeholder="https://www.linkedin.com/jobs/view/... or Indeed, Naukri, Glassdoor"
              className="flex-1 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={fetchFromUrl}
              disabled={urlStatus === "loading" || !urlInput.trim()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 disabled:opacity-50 transition-all whitespace-nowrap"
            >
              {urlStatus === "loading" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Link size={14} />
              )}
              {urlStatus === "loading" ? "Fetching..." : "Fetch JD"}
            </button>
          </div>

          {/* Status Messages */}
          {urlStatus === "success" && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 size={14} />
              <span>Job description fetched successfully! Switching to text view…</span>
            </div>
          )}
          {urlStatus === "error" && (
            <div className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-400">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{urlError}</span>
            </div>
          )}

          {/* Supported Sites */}
          <div className="flex flex-wrap gap-1.5">
            {["LinkedIn", "Indeed", "Glassdoor", "Naukri", "Internshala", "Any Job Site"].map((site) => (
              <span
                key={site}
                className="rounded-md border border-slate-800 bg-slate-950/60 px-2 py-0.5 text-[11px] font-medium text-slate-400"
              >
                {site}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Paste Text Tab (always visible when paste tab active, or after URL fetch) */}
      {activeTab === "paste" && (
        <div className="relative flex-1">
          <textarea
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste requirements, responsibilities, or role specifications..."
            className="w-full h-full min-h-[170px] resize-none rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm leading-relaxed text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            aria-label="Target Job Description"
          />

          {jobDescription && (
            <button
              type="button"
              onClick={clearText}
              className="absolute right-3.5 top-3.5 rounded-md bg-slate-800/80 p-1.5 text-slate-400 hover:text-slate-200 transition-colors"
              title="Clear text"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      )}

      {/* Counter Footer */}
      <div className="flex items-center justify-between mt-2.5 text-xs text-slate-300 font-medium">
        <span>
          {activeTab === "url" ? "Paste URL or fetch from any job board" : "Paste target job specs"}
        </span>
        <span>{wordCount} Words • {charCount} Characters</span>
      </div>
    </div>
  );
}

export default JobDescription;