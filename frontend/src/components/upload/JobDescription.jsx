import { Sparkles, Trash2, Briefcase } from "lucide-react";

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

function JobDescription({
  jobDescription,
  setJobDescription,
}) {
  const wordCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0;
  const charCount = jobDescription.length;

  const loadSample = () => {
    setJobDescription(SAMPLE_JD);
  };

  const clearText = () => {
    setJobDescription("");
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

        {/* Preset Action */}
        <button
          type="button"
          onClick={loadSample}
          className="inline-flex items-center gap-1.5 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <Sparkles size={14} />
          <span>Load Sample JD</span>
        </button>
      </div>

      {/* Textarea */}
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

      {/* Counter Footer */}
      <div className="flex items-center justify-between mt-2.5 text-xs text-slate-300 font-medium">
        <span>Paste target job specs</span>
        <span>
          {wordCount} Words • {charCount} Characters
        </span>
      </div>
    </div>
  );
}

export default JobDescription;