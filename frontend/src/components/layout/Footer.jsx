import { motion } from "framer-motion";
import {
  FaRobot,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const techStack = [
  "React",
  "FastAPI",
  "Groq",
  "Tailwind CSS",
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">

      <div className="mx-auto max-w-7xl px-6 py-14">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >

          {/* Logo */}

          <div className="flex justify-center">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-3 shadow-lg">
                <FaRobot className="text-2xl text-white" />
              </div>

              <div className="text-left">

                <h2 className="text-3xl font-extrabold tracking-tight">

                  ResumeMatch{" "}

                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    AI
                  </span>

                </h2>

                <p className="text-sm text-slate-500">
                  AI Resume Analyzer
                </p>

              </div>

            </div>

          </div>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Optimize your resume with Artificial Intelligence,
            improve ATS compatibility, identify missing skills,
            and receive a personalized learning roadmap.
          </p>

          {/* Tech Stack */}

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            {techStack.map((tech) => (

              <span
                key={tech}
                className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
              >
                {tech}
              </span>

            ))}

          </div>

          {/* Social Buttons */}

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <a
              href="https://github.com/Subham5126"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg"
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/subham-phad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg"
            >
              <FaLinkedin />
              LinkedIn
            </a>

            <a
              href="mailto:subhamnphad@gmail.com"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg"
            >
              <FaEnvelope />
              Email
            </a>

          </div>

          {/* Divider */}

          <div className="my-10 h-px w-full bg-slate-200/70" />

          {/* Bottom */}

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">

            <p>
              © 2026 ResumeMatch AI. All rights reserved.
            </p>

            <p className="flex items-center gap-2">
              Built with
              <FaHeart className="text-red-500" />
              by
              <span className="font-semibold text-slate-700">
                Subham Phad
              </span>
            </p>

          </div>

        </motion.div>

      </div>

    </footer>
  );
}