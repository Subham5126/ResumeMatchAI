import { motion } from "framer-motion";
import { FaRobot, FaCheckCircle, FaArrowRight } from "react-icons/fa";

const features = ["ATS Optimized", "AI Powered", "Learning Roadmap"];

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl"
    >
      {/* Badge */}

      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 shadow-sm">
        <FaRobot />
        Powered by AI
      </div>

      {/* Heading */}

      <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground text-balance lg:text-6xl">
        Land the job with a
        <span className="mt-1 block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          resume that matches.
        </span>
      </h1>

      {/* Description */}

      <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
        Instantly compare your resume against any job description. Improve ATS
        compatibility, uncover missing skills, and get a personalized learning
        roadmap and interview prep.
      </p>

      {/* CTA */}

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <motion.a
          href="#analyze"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-7 py-3.5 font-display font-bold tracking-tight text-primary-foreground shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40"
        >
          Analyze Resume
          <FaArrowRight />
        </motion.a>

        <a
          href="#features"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 font-medium text-foreground transition-all hover:border-emerald-400/60 hover:text-emerald-300"
        >
          See Features
        </a>
      </div>

      {/* Features */}

      <div className="mt-10 flex flex-wrap gap-6">
        {features.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <FaCheckCircle className="text-sm text-emerald-400" />
            <span className="text-sm font-medium text-foreground">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
