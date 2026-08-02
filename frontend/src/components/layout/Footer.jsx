import {
  FaRobot,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-8 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg">
              <FaRobot size={18} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-tight text-white">
                ResumeMatch <span className="text-indigo-400">AI</span>
              </h2>
              <p className="text-[10px] text-slate-500">
                Groq AI Resume Compatibility & ATS Auditor
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Subham5126"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-850 hover:text-white transition-colors"
            >
              <FaGithub size={14} />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/subham-phad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-850 hover:text-white transition-colors"
            >
              <FaLinkedin size={14} />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:subhamnphad@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-850 hover:text-white transition-colors"
            >
              <FaEnvelope size={14} />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-medium">
          <p>© 2026 ResumeMatch AI. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with</span>
            <FaHeart className="text-rose-500" size={12} />
            <span>by</span>
            <span className="font-semibold text-slate-300">Subham Phad</span>
          </p>
        </div>
      </div>
    </footer>
  );
}