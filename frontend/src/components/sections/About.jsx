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
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            About ResumeMatch AI
          </span>

          <h2 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
            Your AI Career
            <span className="block text-blue-600">
              Assistant
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            ResumeMatch AI helps students and professionals
            optimize their resumes using Artificial Intelligence.
            Instantly compare your resume with any job description,
            identify missing skills, improve ATS compatibility,
            and receive a personalized learning roadmap.
          </p>

          <div className="mt-10 space-y-5">
            {features.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4"
              >
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <FaCheckCircle />
                </div>

                <span className="text-lg font-medium text-slate-700">
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
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Resume Analysis
                </p>

                <h3 className="text-2xl font-bold text-slate-900">
                  Dashboard Preview
                </h3>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-3 text-white">
                <FaRobot size={22} />
              </div>

            </div>

            {/* Scores */}

            <div className="mt-8 grid grid-cols-3 gap-4">

              <div className="rounded-2xl bg-blue-50 p-4 text-center">
                <FaFileAlt className="mx-auto text-blue-600 text-xl" />
                <p className="mt-2 text-sm text-slate-500">
                  ATS
                </p>
                <h4 className="text-2xl font-bold">
                  95%
                </h4>
              </div>

              <div className="rounded-2xl bg-green-50 p-4 text-center">
                <FaChartLine className="mx-auto text-green-600 text-xl" />
                <p className="mt-2 text-sm text-slate-500">
                  Match
                </p>
                <h4 className="text-2xl font-bold">
                  91%
                </h4>
              </div>

              <div className="rounded-2xl bg-purple-50 p-4 text-center">
                <FaGraduationCap className="mx-auto text-purple-600 text-xl" />
                <p className="mt-2 text-sm text-slate-500">
                  Roadmap
                </p>
                <h4 className="text-2xl font-bold">
                  Ready
                </h4>
              </div>

            </div>

            {/* Skills */}

            <div className="mt-8 rounded-2xl bg-slate-50 p-5">

              <h4 className="font-semibold text-slate-800">
                Matched Skills
              </h4>

              <div className="mt-4 flex flex-wrap gap-3">

                {[
                  "React",
                  "Python",
                  "FastAPI",
                  "Machine Learning",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}   