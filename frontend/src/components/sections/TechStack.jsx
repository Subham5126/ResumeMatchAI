import { motion } from "framer-motion";
import { FaReact, FaPython, FaGitAlt, FaGithub, FaFire } from "react-icons/fa";
import { SiTailwindcss, SiFastapi, SiFramer, SiOpencv } from "react-icons/si";

const stacks = [
  {
    title: "Frontend",
    tech: [
      { name: "React", icon: <FaReact className="text-sky-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: "Framer Motion", icon: <SiFramer className="text-pink-400" /> },
    ],
  },
  {
    title: "Backend",
    tech: [
      { name: "FastAPI", icon: <SiFastapi className="text-emerald-400" /> },
      { name: "Python", icon: <FaPython className="text-yellow-400" /> },
    ],
  },
  {
    title: "AI / ML",
    tech: [
      { name: "Groq API", icon: <FaFire className="text-orange-400" /> },
      { name: "Sentence Transformers", icon: <SiOpencv className="text-teal-400" /> },
    ],
  },
  {
    title: "Tools",
    tech: [
      { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
      { name: "GitHub", icon: <FaGithub className="text-foreground" /> },
      { name: "Firebase", icon: <FaFire className="text-amber-400" /> },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="py-12">
      {/* Heading */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
          Technologies Used
        </span>

        <h2 className="mt-5 font-display text-4xl font-bold text-foreground lg:text-5xl">
          Built With Modern Tech
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground text-pretty">
          ResumeMatch AI combines modern web technologies, Artificial
          Intelligence, and cloud tools to deliver an intelligent resume
          analysis experience.
        </p>
      </motion.div>

      {/* Cards */}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {stacks.map((stack, index) => (
          <motion.div
            key={stack.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-emerald-400/40 hover:shadow-xl hover:shadow-emerald-500/10"
          >
            <h3 className="font-display text-xl font-bold text-foreground">
              {stack.title}
            </h3>

            <div className="mt-5 flex flex-wrap gap-3">
              {stack.tech.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex cursor-default items-center gap-2 rounded-full border border-border bg-elevated px-4 py-2"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
