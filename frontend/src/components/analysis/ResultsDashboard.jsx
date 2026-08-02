import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import ResumeRewrite from "./ResumeRewrite";
import DashboardHeader from "./DashboardHeader";
import ScoreCard from "./ScoreCard";
import ATSReport from "./ATSReport";
import SkillsSection from "./SkillsSection";
import RecommendationCard from "./RecommendationCard";
import InterviewQuestions from "./InterviewQuestions";
import LearningRoadmap from "../roadmap/LearningRoadmap";
import CoverLetter from "./CoverLetter";

function ResultsDashboard({ analysis }) {
  if (!analysis) return null;

  const scoreCards = [
    {
      title: "Overall Match",
      score: analysis.overall_score ?? 0,
    },
    {
      title: "ATS Score",
      score:
        analysis.ats_report?.ats_score ??
        analysis.overall_score ??
        0,
    },
    {
      title: "Keyword Match",
      score: analysis.keyword_analysis?.score ?? 0,
    },
    {
      title: "Semantic Match",
      score:
        analysis.semantic_analysis?.semantic_score ?? 0,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      {/* ================= HEADER ================= */}

      <DashboardHeader analysis={analysis} />

      {/* ================= SCORE CARDS ================= */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {scoreCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
          >
            <ScoreCard
              title={card.title}
              score={card.score}
            />
          </motion.div>
        ))}
      </section>

      {/* ================= ATS REPORT ================= */}

      {analysis.ats_report && (
        <section>
          <ATSReport report={analysis.ats_report} />
        </section>
      )}

      {/* ================= SKILLS ================= */}

      <section>
        <SkillsSection
          matched={
            analysis.keyword_analysis?.matched_skills ?? []
          }
          missing={
            analysis.keyword_analysis?.missing_skills ?? []
          }
        />
      </section>

      {/* ================= AI RECOMMENDATIONS ================= */}

      {analysis.recommendations?.length > 0 && (
        <section className="space-y-6">

          {/* Header */}

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-emerald-500/10 p-3">
                <Lightbulb
                  size={24}
                  className="text-emerald-300"
                />
              </div>

              <div>

                <h2 className="font-display text-3xl font-bold text-foreground">
                  AI Recommendations
                </h2>

                <p className="mt-1 text-muted-foreground">
                  Personalized suggestions to improve your
                  resume for this specific job.
                </p>

              </div>

            </div>

            <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              {analysis.recommendations.length} Suggestions
            </div>

          </div>

          {/* Cards */}

          <div className="grid gap-6 lg:grid-cols-2">

            {analysis.recommendations.map(
              (recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                >
                  <RecommendationCard
                    recommendation={recommendation}
                  />
                </motion.div>
              )
            )}

          </div>

        </section>
      )}

      {/* ================= RESUME REWRITE ================= */}

        <section>
            <ResumeRewrite analysis={analysis} />
        </section>

      {/* ================= COVER LETTER ================= */}

        <section>
            <CoverLetter analysis={analysis} />
        </section>

        <section>
            <InterviewQuestions
                questions={analysis.interview_questions}
            />
        </section>

      {/* ================= INTERVIEW QUESTIONS ================= */}

      {analysis.interview_questions &&
        Object.keys(analysis.interview_questions).length >
          0 && (
          <section>
            <InterviewQuestions
              questions={analysis.interview_questions}
            />
          </section>
        )}

      {/* ================= LEARNING ROADMAP ================= */}

      {analysis.learning_roadmap && (
        <section>
          <LearningRoadmap
            roadmap={analysis.learning_roadmap}
          />
        </section>
      )}
      <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
        <h3 className="font-display text-xl font-bold text-foreground">
          Thank you for using ResumeMatch AI
        </h3>

        <p className="mt-2 text-muted-foreground">
          {"We'd appreciate your feedback. It only takes a minute and helps us improve."}
        </p>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdF2lEDeVLRHAfcy-ml5sMbvjpAIqp6XWB5t_0euoHaYY8URg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-emerald-500/25 transition hover:scale-105"
        >
          Share Feedback
        </a>
      </div>
    </motion.div>
  );
}

export default ResultsDashboard;
