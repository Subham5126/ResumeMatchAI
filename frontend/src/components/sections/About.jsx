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
    <section className="py-16">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Left Content */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
            About ResumeMatch AI
          </span>

          <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            Your AI Career
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Assistant
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            ResumeMatch AI helps students and professionals optimize their
            resumes using Artificial Intelligence. Instantly compare your resume
            with any job description, identify missing skills, improve ATS
            compatibility, and receive a personalized learning roadmap.
          </p>

          <div className="mt-10 space-y-5">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="rounded-full bg-emerald-400/15 p-2 text-emerald-400">
                  <FaCheckCircle />
                </div>

                <span className="text-lg font-medium text-foreground">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Dashboard */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="rounded-3xl border border-border bg-card p-8 shadow-2xl shadow-black/40 transition-all duration-300 hover:border-emerald-400/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resume Analysis</p>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Dashboard Preview
                </h3>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 p-3 text-primary-foreground">
                <FaRobot size={22} />
              </div>
            </div>

            {/* Scores */}

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border bg-elevated p-4 text-center">
                <FaFileAlt className="mx-auto text-xl text-emerald-400" />
                <p className="mt-2 text-sm text-muted-foreground">ATS</p>
                <h4 className="text-2xl font-bold text-foreground">95%</h4>
              </div>

              <div className="rounded-2xl border border-border bg-elevated p-4 text-center">
                <FaChartLine className="mx-auto text-xl text-teal-400" />
                <p className="mt-2 text-sm text-muted-foreground">Match</p>
                <h4 className="text-2xl font-bold text-foreground">91%</h4>
              </div>

              <div className="rounded-2xl border border-border bg-elevated p-4 text-center">
                <FaGraduationCap className="mx-auto text-xl text-amber-400" />
                <p className="mt-2 text-sm text-muted-foreground">Roadmap</p>
                <h4 className="text-2xl font-bold text-foreground">Ready</h4>
              </div>
            </div>

            {/* Skills */}

            <div className="mt-8 rounded-2xl border border-border bg-elevated p-5">
              <h4 className="font-semibold text-foreground">Matched Skills</h4>

              <div className="mt-4 flex flex-wrap gap-3">
                {["React", "Python", "FastAPI", "Machine Learning"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
