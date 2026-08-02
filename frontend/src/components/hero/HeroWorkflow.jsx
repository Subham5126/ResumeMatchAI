import { UploadCloud, Cpu, BarChart3, Sparkles, ArrowDownRight, CheckCircle2 } from "lucide-react";

export default function HeroWorkflow() {
  const steps = [
    {
      num: "01",
      title: "Upload & Input Specs",
      desc: "Drop your PDF/DOCX resume and paste target job requirements.",
      icon: UploadCloud,
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    },
    {
      num: "02",
      title: "AI Vector Analysis",
      desc: "Llama-3.3-70b computes semantic skill matches & ATS formatting.",
      icon: Cpu,
      badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    },
    {
      num: "03",
      title: "Executive Score Audit",
      desc: "Get instant match scores, missing keyword pills, and ATS badges.",
      icon: BarChart3,
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      num: "04",
      title: "AI Tools & Roadmap",
      desc: "Rewrite weak resume bullets, generate cover letter, & prep STAR Q&A.",
      icon: Sparkles,
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
  ];

  const scrollToWorkspace = () => {
    document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-xl glow-indigo border-beam-card">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" />
          </span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Application Workflow
          </h3>
        </div>
        <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300">
          4 Automated Steps
        </span>
      </div>

      {/* 4-Step Timeline Workflow */}
      <div className="space-y-2">

        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="relative flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5 transition-all hover:border-slate-700 hover:bg-slate-950/90 group"
            >
              {/* Step Icon Badge */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border font-bold text-xs shadow-md z-10 transition-transform group-hover:scale-110 ${step.badgeColor}`}
              >
                <Icon size={18} />
              </div>

              {/* Step Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {step.title}
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    STEP {step.num}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400 mt-0.5">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Prompt */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span className="text-[11px] font-medium">Powered by AI LLM Engine</span>
        </div>
        <button
          type="button"
          onClick={scrollToWorkspace}
          className="inline-flex items-center gap-1 font-bold text-indigo-400 hover:text-indigo-300 text-[11px] transition-colors"
        >
          <span>Try Workspace Now</span>
          <ArrowDownRight size={14} />
        </button>
      </div>
    </div>
  );
}