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

import api from "../services/api";

function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
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
      toast.error("Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <PageContainer>

          {/* ================= HERO ================= */}

          <section
            id="home"
            className="scroll-mt-20"
          >
            <Hero />
          </section>

          {/* ================= ANALYZE ================= */}

          <section
            id="analyze"
            className="scroll-mt-20 py-16"
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <ResumeUpload
                resumeFile={resumeFile}
                setResumeFile={setResumeFile}
              />

              <JobDescription
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
              />
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className={`flex items-center gap-3 rounded-xl px-10 py-3 font-semibold text-white shadow-lg transition-all duration-300 ${
                  loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 hover:shadow-xl"
                }`}
              >
                {loading && (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}

                {loading
                  ? "Analyzing Resume..."
                  : "🚀 Analyze Resume"}
              </button>
            </div>

            {loading && (
              <div className="mt-10">
                <AnalysisLoader />
              </div>
            )}

            {!loading && analysis && (
              <div
                id="results"
                className="mt-12"
              >
                <ResultsDashboard analysis={analysis} />
              </div>
            )}
          </section>

          {/* ================= FEATURES ================= */}

          <section
            id="features"
            className="scroll-mt-20 py-16"
          >
            <Features />
          </section>

          {/* ================= ABOUT ================= */}

          <section
            id="about"
            className="scroll-mt-20 py-16"
          >
            <About />
          </section>

          {/* ================= TECH STACK ================= */}

          <section
            id="tech-stack"
            className="py-16"
          >
            <TechStack />
          </section>

          {/* ================= FOOTER ================= */}

          <Footer />

        </PageContainer>
      </main>

      {/* ================= AI CHATBOT ================= */}

      <ChatBot analysis={analysis} />
    </>
  );
}

export default Home;