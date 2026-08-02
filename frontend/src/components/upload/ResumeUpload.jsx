import { useState } from "react";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";

function ResumeUpload({ resumeFile, setResumeFile }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl h-full flex flex-col justify-between backdrop-blur-md card-hover-effect">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <FileText size={18} />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white">
            1. Upload Resume Document
          </h2>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          PDF / DOCX
        </span>
      </div>

      <label
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative flex min-h-[170px] flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-all ${
          dragActive
            ? "border-indigo-500 bg-indigo-500/10 scale-[0.99]"
            : resumeFile
            ? "border-emerald-500/40 bg-emerald-500/10"
            : "border-slate-800 bg-slate-950/60 hover:border-indigo-500/40 hover:bg-slate-950/80"
        }`}
      >
        {resumeFile ? (
          <div className="flex flex-col items-center gap-2 w-full max-w-xs">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 size={22} />
            </div>

            <div className="w-full text-center truncate">
              <p className="text-sm font-bold text-white truncate">
                {resumeFile.name}
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                {formatFileSize(resumeFile.size)} • Ready for analysis
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setResumeFile(null);
              }}
              className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
            >
              <X size={14} />
              <span>Remove File</span>
            </button>
          </div>
        ) : (
          <>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
              <UploadCloud size={22} />
            </div>
            <p className="text-sm font-bold text-slate-100">
              Drag & Drop your resume here, or <span className="text-indigo-400 underline">browse</span>
            </p>
            <p className="text-xs text-slate-300 mt-1">
              Supports PDF, DOC, DOCX up to 5MB
            </p>
          </>
        )}

        <input
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setResumeFile(e.target.files[0]);
            }
          }}
        />
      </label>
    </div>
  );
}

export default ResumeUpload;