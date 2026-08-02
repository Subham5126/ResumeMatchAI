import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaFileAlt,
  FaRobot,
  FaChartLine,
  FaGraduationCap,
} from "react-icons/fa";

const features = [
  "ATS Resume Optimization",
  "AI Semantic Matching",
  "Skill Gap Detection",
  "Personalized Learning Roadmap",
];

export default function About() {
  return (
    <div className="py-12">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-300">
            About ResumeMatch AI
          </span>

          <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Your Autonomous AI Career Copilot
          </h2>

          <p className="mt-3 text-xs leading-relaxed text-slate-300">
            ResumeMatch AI empowers job seekers to benchmark their resumes against any job posting in seconds. Instantly identify missing skills, audit ATS readability, generate tailored cover letters, and unlock personalized 4-week learning roadmaps.
          </p>

          <div className="mt-6 space-y-3">
            {features.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FaCheckCircle size={12} />
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl card-hover-effect">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Live Vector Analysis
                </p>
                <h3 className="text-sm font-bold text-white">
                  Dashboard Audit Preview
                </h3>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <FaRobot size={16} />
              </div>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-3 gap-3">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center transition-colors hover:border-indigo-500/30"
              >
                <FaFileAlt className="mx-auto text-indigo-400 text-sm" />
                <p className="mt-1 text-[10px] font-semibold text-slate-400">
                  ATS Score
                </p>
                <h4 className="text-lg font-black text-emerald-400">
                  95%
                </h4>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center transition-colors hover:border-emerald-500/30"
              >
                <FaChartLine className="mx-auto text-emerald-400 text-sm" />
                <p className="mt-1 text-[10px] font-semibold text-slate-400">
                  Vector Match
                </p>
                <h4 className="text-lg font-black text-white">
                  91%
                </h4>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center transition-colors hover:border-purple-500/30"
              >
                <FaGraduationCap className="mx-auto text-purple-400 text-sm" />
                <p className="mt-1 text-[10px] font-semibold text-slate-400">
                  Roadmap
                </p>
                <h4 className="text-lg font-black text-indigo-300">
                  Ready
                </h4>
              </motion.div>
            </div>

            {/* Matched Skills */}
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <h4 className="text-xs font-bold text-slate-300 mb-2">
                ✓ Extracted Matched Skills
              </h4>

              <div className="flex flex-wrap gap-1.5">
                {["React 19", "Python 3.12", "FastAPI", "Machine Learning"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}   