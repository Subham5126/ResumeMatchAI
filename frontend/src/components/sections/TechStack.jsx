import { motion } from "framer-motion";
import {
  FaReact,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaFire,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiFastapi,
  SiFramer,
  SiOpencv,
} from "react-icons/si";

const stacks = [
  {
    title: "Frontend",
    tech: [
      { name: "React", icon: <FaReact className="text-sky-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
      { name: "Framer Motion", icon: <SiFramer className="text-pink-500" /> },
    ],
  },
  {
    title: "Backend",
    tech: [
      { name: "FastAPI", icon: <SiFastapi className="text-green-600" /> },
      { name: "Python", icon: <FaPython className="text-yellow-500" /> },
    ],
  },
  {
    title: "AI / ML",
    tech: [
      { name: "Groq API", icon: <FaFire className="text-orange-500" /> },
      { name: "Sentence Transformers", icon: <SiOpencv className="text-blue-500" /> },
    ],
  },
  {
    title: "Tools",
    tech: [
      { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
      { name: "GitHub", icon: <FaGithub /> },
      { name: "Firebase", icon: <FaFire className="text-yellow-500" /> },
    ],
  },
];

export default function TechStack() {
  return (
    <div className="py-12">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl mx-auto mb-10"
      >
        <span className="inline-flex items-center gap-1 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-300">
          Architecture & Stack
        </span>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
          Powered by Enterprise Engineering Stack
        </h2>

        <p className="mt-2 text-xs text-slate-400">
          Combining React 19, FastAPI, Groq LLM Inference engines, and vector similarity algorithms.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {stacks.map((stack, index) => (
          <motion.div
            key={stack.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md card-hover-effect cursor-pointer"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {stack.title} Architecture
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {stack.tech.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 transition-colors hover:border-indigo-500/40 hover:bg-slate-900"
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs font-semibold text-slate-200">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}