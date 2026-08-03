import { useState } from "react";
import { Mic, BookOpen, Sparkles, Loader2, AlertCircle } from "lucide-react";
import api from "../../services/api";
import InterviewQuestions from "./InterviewQuestions";
import LearningRoadmap from "../roadmap/LearningRoadmap";

function GenerateCard({ icon: Icon, title, description, onGenerate, loading, children, generated }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl backdrop-blur-md overflow-hidden">
      {!generated ? (
        <div className="p-8 flex flex-col items-center text-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-lg">
            <Icon size={28} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-slate-400 max-w-sm">{description}</p>
          </div>
          <button
            type="button"
            onClick={onGenerate}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-indigo-500 disabled:opacity-60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Generating…</span>
              </>
            ) : (
              <>
                <Sparkles size={16} className="text-amber-300" />
                <span>Generate with AI</span>
              </>
            )}
          </button>
          {loading && (
            <p className="text-xs text-slate-500 animate-pulse">
              AI is crafting personalised content — usually 10–20 seconds…
            </p>
          )}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default function CareerTab({ analysis }) {
  const [interviewData, setInterviewData]   = useState(null);
  const [roadmapData, setRoadmapData]       = useState(null);
  const [interviewLoading, setInterviewLoading] = useState(false);
  const [roadmapLoading, setRoadmapLoading]     = useState(false);
  const [interviewError, setInterviewError] = useState("");
  const [roadmapError, setRoadmapError]     = useState("");

  const generateInterview = async () => {
    setInterviewLoading(true);
    setInterviewError("");
    try {
      const res = await api.post("/generate/interview", { analysis });
      setInterviewData(res.data.interview_questions);
    } catch (e) {
      setInterviewError(e?.response?.data?.detail || "Failed to generate. Please try again.");
    } finally {
      setInterviewLoading(false);
    }
  };

  const generateRoadmap = async () => {
    setRoadmapLoading(true);
    setRoadmapError("");
    try {
      const res = await api.post("/generate/roadmap", { analysis });
      setRoadmapData(res.data.learning_roadmap);
    } catch (e) {
      setRoadmapError(e?.response?.data?.detail || "Failed to generate. Please try again.");
    } finally {
      setRoadmapLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Interview Questions */}
      <GenerateCard
        icon={Mic}
        title="AI Interview Practice Questions"
        description="Generate role-specific technical, behavioral, and situational interview questions tailored to your resume and target job."
        onGenerate={generateInterview}
        loading={interviewLoading}
        generated={!!interviewData}
      >
        {interviewData && <InterviewQuestions questions={interviewData} />}
      </GenerateCard>

      {interviewError && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-400">
          <AlertCircle size={14} className="shrink-0" />
          {interviewError}
        </div>
      )}

      {/* Learning Roadmap */}
      <GenerateCard
        icon={BookOpen}
        title="Personalised Learning Roadmap"
        description="Build a 4-week skill-gap roadmap with curated resources, milestones, and learning priorities based on your missing skills."
        onGenerate={generateRoadmap}
        loading={roadmapLoading}
        generated={!!roadmapData}
      >
        {roadmapData && <LearningRoadmap roadmap={roadmapData} />}
      </GenerateCard>

      {roadmapError && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-400">
          <AlertCircle size={14} className="shrink-0" />
          {roadmapError}
        </div>
      )}
    </div>
  );
}
