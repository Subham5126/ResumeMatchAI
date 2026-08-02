import { motion } from "framer-motion";
import {
  FaRobot,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const techStack = ["React", "FastAPI", "Groq", "Tailwind CSS"];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-transparent to-card/60">
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
              <div className="rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 p-3 shadow-lg shadow-emerald-500/30">
                <FaRobot className="text-2xl text-primary-foreground" />
              </div>

              <div className="text-left">
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
                  ResumeMatch{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    AI
                  </span>
                </h2>

                <p className="text-sm text-muted-foreground">
                  AI Resume Analyzer
                </p>
              </div>
            </div>
          </div>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Optimize your resume with Artificial Intelligence, improve ATS
            compatibility, identify missing skills, and receive a personalized
            learning roadmap.
          </p>

          {/* Tech Stack */}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300"
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
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:text-emerald-300"
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/subham-phad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:text-emerald-300"
            >
              <FaLinkedin />
              LinkedIn
            </a>

            <a
              href="mailto:subhamnphad@gmail.com"
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:text-emerald-300"
            >
              <FaEnvelope />
              Email
            </a>
          </div>

          {/* Divider */}

          <div className="my-10 h-px w-full bg-border" />

          {/* Bottom */}

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>© 2026 ResumeMatch AI. All rights reserved.</p>

            <p className="flex items-center gap-2">
              Built with
              <FaHeart className="text-rose-500" />
              by
              <span className="font-semibold text-foreground">Subham Phad</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
