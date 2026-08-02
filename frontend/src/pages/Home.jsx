import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import Footer from "../components/layout/Footer";
import toast from "react-hot-toast";
import Features from "../components/sections/Features";
import About from "../components/sections/About";
import TechStack from "../components/sections/TechStack";

import ResumeUpload from "../components/upload/ResumeUpload";
import JobDescription from "../components/upload/JobDescription";

import AnalysisLoader from "../components/analysis/AnalysisLoader";
import ResultsDashboard from "../components/analysis/ResultsDashboard";

import ChatBot from "../components/chat/ChatBot";
import PageContainer from "../components/common/PageContainer";
import CursorSpotlight from "../components/common/CursorSpotlight";
import api from "../services/api";
import { Sparkles, ArrowDown, CheckCircle } from "lucide-react";

function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      toast.error("Please upload a resume file and paste a job description.");
      return;
    }

    setLoading(true);
    setAnalysis(null);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jobDescription);

    try {
      const response = await api.post("/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAnalysis(response.data);
      toast.success("Resume analyzed successfully!");

      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    } catch (error) {
      console.error(error);
      toast.error("Analysis Failed. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToResults = () => {
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between bg-grid-mesh">
      <Navbar />

      <main className="flex-1">
        {/* Full-width Dark Hero Section */}
        <section id="home" className="scroll-mt-14">
          <Hero />
        </section>

        {/* Main Content Area */}
        <PageContainer className="py-10 space-y-12">
          {/* Analyze Upload Section */}
          <section id="analyze" className="scroll-mt-20">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  AI Resume Matcher Workspace
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-1">
                  Upload your resume and target job requirements to generate a complete ATS & skill compatibility audit.
                </p>
              </div>

              {analysis && (
                <button
                  type="button"
                  onClick={scrollToResults}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs sm:text-sm font-bold text-emerald-400 hover:bg-emerald-500/20 transition-colors self-start sm:self-auto"
                >
                  <CheckCircle size={16} />
                  <span>View Analysis Results</span>
                  <ArrowDown size={16} />
                </button>
              )}
            </div>

            {/* Input Grid */}
            <div className="grid gap-6 md:grid-cols-2 items-stretch">
              <ResumeUpload
                resumeFile={resumeFile}
                setResumeFile={setResumeFile}
              />

              <JobDescription
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
              />
            </div>

            {/* Action Bar */}
            <div className="mt-8 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading}
                className={`inline-flex items-center justify-center gap-2.5 rounded-xl px-10 py-4 text-base font-extrabold text-white shadow-xl transition-all ${
                  loading
                    ? "bg-slate-800 cursor-not-allowed opacity-70 border border-slate-700"
                    : "bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 btn-glow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                }`}
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Analyzing Resume with Groq AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="text-amber-300 animate-pulse" />
                    <span>Run AI Deep Analysis →</span>
                  </>
                )}
              </button>
            </div>

            {/* Loading Indicator */}
            {loading && (
              <div className="mt-8">
                <AnalysisLoader />
              </div>
            )}

            {/* Pre-Analysis Feature Checklist */}
            {!loading && !analysis && (
              <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/80 p-5 text-center shadow-lg">
                <p className="text-sm font-bold text-slate-200">
                  Ready to optimize your resume? Upload your resume and paste a job description above. We'll automatically generate:
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2.5 text-xs font-semibold text-slate-300">
                  <span className="rounded-md border border-slate-800 bg-slate-950/70 px-3 py-1.5">✓ ATS Compatibility</span>
                  <span className="rounded-md border border-slate-800 bg-slate-950/70 px-3 py-1.5">✓ Skill Match Score</span>
                  <span className="rounded-md border border-slate-800 bg-slate-950/70 px-3 py-1.5">✓ Missing Keywords</span>
                  <span className="rounded-md border border-slate-800 bg-slate-950/70 px-3 py-1.5">✓ AI Recommendations</span>
                  <span className="rounded-md border border-slate-800 bg-slate-950/70 px-3 py-1.5">✓ Interview Preparation</span>
                </div>
              </div>
            )}

            {/* Results Dashboard */}
            {!loading && analysis && (
              <div id="results" className="mt-10 scroll-mt-20">
                <ResultsDashboard analysis={analysis} />
              </div>
            )}
          </section>

          {/* Showcase Sections */}
          <section id="features" className="scroll-mt-20 border-t border-slate-800/80 pt-8">
            <Features />
          </section>

          <section id="about" className="scroll-mt-20 border-t border-slate-800/80 pt-8">
            <About />
          </section>

          <section id="tech" className="scroll-mt-20 border-t border-slate-800/80 pt-8">
            <TechStack />
          </section>
        </PageContainer>
      </main>

      <Footer />
      <ChatBot analysis={analysis} />
      <CursorSpotlight />
    </div>
  );
}

export default Home;