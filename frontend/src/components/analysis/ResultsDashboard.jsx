import { useState, useEffect } from "react";
import { Lightbulb, LayoutDashboard, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";
import ResumeRewrite from "./ResumeRewrite";
import DashboardHeader from "./DashboardHeader";
import ScoreCard from "./ScoreCard";
import ATSReport from "./ATSReport";
import SkillsSection from "./SkillsSection";
import RecommendationCard from "./RecommendationCard";
import CareerTab from "./CareerTab";
import CoverLetter from "./CoverLetter";
import SkillChart from "./SkillChart";

function ResultsDashboard({ analysis }) {
  const [activeTab, setActiveTab] = useState("overview");

  // Load previous scores lazily from localStorage
  const [prevScores] = useState(() => {
    try {
      const stored = localStorage.getItem('resumematch_score_history');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Save current scores for next-run delta comparison
    const current = {
      overall: analysis.overall_score ?? 0,
      ats: analysis.ats_report?.ats_score ?? 0,
      keyword: analysis.keyword_analysis?.score ?? 0,
      semantic: analysis.semantic_analysis?.semantic_score ?? 0,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('resumematch_score_history', JSON.stringify(current));
  }, [analysis]);

  if (!analysis) return null;

  const scoreCards = [
    { title: 'Overall Match', score: analysis.overall_score ?? 0, prevScore: prevScores?.overall },
    { title: 'ATS Score', score: analysis.ats_report?.ats_score ?? analysis.overall_score ?? 0, prevScore: prevScores?.ats },
    { title: 'Keyword Match', score: analysis.keyword_analysis?.score ?? 0, prevScore: prevScores?.keyword },
    { title: 'Semantic Match', score: analysis.semantic_analysis?.semantic_score ?? 0, prevScore: prevScores?.semantic },
  ];

  const tabs = [
    { id: "overview", label: "Overview & Scores", icon: LayoutDashboard },
    { id: "audit", label: "ATS & Skill Audit", icon: ShieldCheck },
    { id: "tools", label: "AI Rewriter & Cover Letter", icon: Sparkles },
    { id: "career", label: "Interview & Roadmap", icon: GraduationCap },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader analysis={analysis} />

      {/* Tab Workspace Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border border-slate-800 bg-slate-900/90 p-1.5 rounded-xl shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={14} className={isActive ? "text-white" : "text-slate-400"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] font-semibold text-slate-400 px-3">
          <span>Targeted Analysis • 4 Modules Unlocked</span>
        </div>
      </div>

      {/* Tab 1: Overview & Scores */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Score Cards Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {scoreCards.map((card) => (
              <ScoreCard key={card.title} title={card.title} score={card.score} prevScore={card.prevScore} />
            ))}
          </div>

          {/* AI Recommendations */}
          {analysis.recommendations?.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
              <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Lightbulb size={16} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">
                      Priority AI Recommendations
                    </h2>
                    <p className="text-xs text-slate-400">
                      Actionable steps to increase recruiter engagement and interview callbacks.
                    </p>
                  </div>
                </div>

                <span className="rounded-md border border-slate-800 bg-slate-950 px-2 py-0.5 text-xs font-semibold text-slate-300 self-start sm:self-auto">
                  {analysis.recommendations.length} Action Items
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {analysis.recommendations.map((recommendation, index) => (
                  <RecommendationCard key={index} recommendation={recommendation} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: ATS & Skill Audit */}
      {activeTab === "audit" && (
        <div className="space-y-6 animate-fadeIn">
          {analysis.ats_report && <ATSReport report={analysis.ats_report} />}

          <SkillChart
            matched={analysis.keyword_analysis?.matched_skills ?? []}
            missing={analysis.keyword_analysis?.missing_skills ?? []}
          />

          <SkillsSection
            matched={analysis.keyword_analysis?.matched_skills ?? []}
            missing={analysis.keyword_analysis?.missing_skills ?? []}
          />
        </div>
      )}

      {/* Tab 3: AI Tools */}
      {activeTab === "tools" && (
        <div className="space-y-6 animate-fadeIn">
          <ResumeRewrite analysis={analysis} />
          <CoverLetter analysis={analysis} />
        </div>
      )}

      {/* Tab 4: Career & Interview — On-Demand Generation */}
      {activeTab === "career" && (
        <CareerTab analysis={analysis} />
      )}

      {/* Footer Feedback Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 text-center shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-md">
        <div className="text-left">
          <h3 className="text-xs font-bold text-white">
            How was your ResumeMatch AI analysis experience?
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Your feedback helps us continuously refine our AI extraction models.
          </p>
        </div>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdF2lEDeVLRHAfcy-ml5sMbvjpAIqp6XWB5t_0euoHaYY8URg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors shrink-0"
        >
          <span>Share Anonymous Feedback</span>
          <span>→</span>
        </a>
      </div>
    </div>
  );
}

export default ResultsDashboard;