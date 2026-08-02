import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroContent() {
  const scrollToAnalyze = () => {
    document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-3xl">
      {/* Product Tag Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 shadow-xs mb-3">
        <Sparkles size={14} className="text-indigo-400 animate-pulse" />
        <span>Vector Match & ATS Audit Engine</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
        Optimize Your Resume for{" "}
        <span className="text-gradient-animate">
          ATS & Recruiter Success
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
        Benchmark your resume against job postings in seconds. Identify missing hard/soft skills, run automated ATS formatting audits, rewrite weak sections, and generate a custom learning roadmap.
      </p>

      {/* CTAs */}
      <div className="mt-5 flex flex-wrap items-center gap-3.5">
        <button
          type="button"
          onClick={scrollToAnalyze}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg btn-glow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <span>Start Deep Analysis</span>
          <ArrowRight size={14} />
        </button>

        <a
          href="#features"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <span>Explore Capabilities</span>
        </a>
      </div>

      {/* Feature Highlights */}
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-800/80 pt-4 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
          <span>ATS Format Auditor</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
          <span>Semantic Skill Vector Match</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
          <span>AI Interview & Roadmap</span>
        </div>
      </div>
    </div>
  );
}