import { useEffect, useState } from "react";
import { FaRobot, FaGithub } from "react-icons/fa";

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
      onClick={() => scrollToSection(id)}
      className={`relative rounded-lg px-3 py-2 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 ${
        active === id
          ? "font-semibold text-blue-600"
          : "text-slate-600"
      }`}
    >
      {label}

      {active === id && (
        <span className="absolute left-3 right-3 -bottom-1 h-0.5 rounded-full bg-blue-600" />
      )}
    </button>
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-white/70 backdrop-blur-lg"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}

        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-3 shadow-lg">
            <FaRobot className="text-lg text-white" />
          </div>

          <div className="text-left">

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              ResumeMatch{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI
              </span>
            </h1>

            <p className="text-xs text-slate-500">
              AI Resume Analyzer
            </p>

          </div>
        </button>

        {/* Navigation */}

        <div className="hidden items-center gap-8 md:flex">
          {navItem("home", "Home")}
          {navItem("features", "Features")}
          {navItem("about", "About")}
        </div>

        {/* GitHub */}

        <a
          href="https://github.com/Subham5126/ResumeMatchAI"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg md:flex"
        >
          <FaGithub className="text-lg" />
          GitHub
        </a>

      </div>
    </nav>
  );
}

export default Navbar;