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
      className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-emerald-300 ${
        active === id ? "text-emerald-300" : "text-muted-foreground"
      }`}
    >
      {label}

      {active === id && (
        <span className="absolute left-3 right-3 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
      )}
    </button>
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 shadow-lg shadow-black/30 backdrop-blur-xl"
          : "border-b border-transparent bg-background/50 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}

        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 p-3 shadow-lg shadow-emerald-500/30">
            <FaRobot className="text-lg text-primary-foreground" />
          </div>

          <div className="text-left">
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
              ResumeMatch{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                AI
              </span>
            </h1>

            <p className="text-xs text-muted-foreground">AI Resume Analyzer</p>
          </div>
        </button>

        {/* Navigation */}

        <div className="hidden items-center gap-6 md:flex">
          {navItem("home", "Home")}
          {navItem("features", "Features")}
          {navItem("about", "About")}
        </div>

        {/* GitHub */}

        <a
          href="https://github.com/Subham5126/ResumeMatchAI"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:text-emerald-300 md:flex"
        >
          <FaGithub className="text-lg" />
          GitHub
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
