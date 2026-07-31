import { motion } from "framer-motion";
import {
  FaRobot,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const features = [
  "ATS Optimized",
  "AI Powered",
  "Learning Roadmap",
];

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-lg"
    >
      {/* Badge */}

      <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
        <FaRobot />
        Powered by AI
      </div>

      {/* Heading */}

      <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-5xl">
        Optimize Your Resume

        <br />

        <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          with AI
        </span>
      </h1>

      {/* Description */}

      <p className="mt-5 text-base leading-7 text-slate-600">
        Improve ATS compatibility, identify missing skills,
        receive semantic matching, interview preparation,
        and personalized learning recommendations.
      </p>

      {/* CTA */}

      <motion.a
        href="#analyze"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
      >
        Analyze Resume

        <FaArrowRight />
      </motion.a>

      {/* Features */}

      <div className="mt-8 flex flex-wrap gap-5">

        {features.map((item) => (

          <div
            key={item}
            className="flex items-center gap-2"
          >
            <FaCheckCircle className="text-green-500 text-sm" />

            <span className="text-sm font-medium text-slate-700">
              {item}
            </span>

          </div>

        ))}

      </div>

    </motion.div>
  );
}