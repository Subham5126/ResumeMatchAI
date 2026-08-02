import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FileSearch } from "lucide-react";

function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = ["home", "features", "about"];

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const navItem = (id, label) => (
    <button
      type="button"
      onClick={() => scrollToSection(id)}
      className={`relative px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg ${
        active === id
          ? "text-white bg-indigo-600/15 border border-indigo-500/30 shadow-xs"
          : "text-slate-300 hover:text-white hover:bg-slate-900/60"
      }`}
    >
      {label}
      {active === id && (
        <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-400 shadow-[0_0_8px_#818cf8]" />
      )}
    </button>
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-2xl shadow-xl shadow-slate-950/50"
          : "border-b border-slate-800/40 bg-slate-950/75 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-18 max-w-[1650px] items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-xl p-1"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-indigo-400 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all duration-300">
            <FileSearch size={20} />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                ResumeMatch
              </span>
              <span className="rounded-md bg-indigo-500/15 px-2 py-0.5 text-xs font-black text-indigo-300 border border-indigo-500/30 shadow-xs">
                AI
              </span>
            </div>
          </div>
        </button>

        {/* Center Nav Links */}
        <div className="hidden items-center gap-3 sm:flex">
          {navItem("home", "Analyzer Workspace")}
          {navItem("features", "Features")}
          {navItem("about", "About Platform")}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3.5">

          {/* GitHub CTA Button */}
          <a
            href="https://github.com/Subham5126/ResumeMatchAI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs sm:text-sm font-bold text-slate-200 transition-all hover:border-indigo-500/50 hover:bg-slate-850 hover:text-white btn-glow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 shadow-md"
            aria-label="GitHub Repository"
          >
            <FaGithub size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;