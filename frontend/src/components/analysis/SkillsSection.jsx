import { motion } from "framer-motion";
import SkillBadge from "./SkillBadge";

function SkillsSection({ matched = [], missing = [] }) {
  const total = matched.length + missing.length;

  const percentage =
    total === 0
      ? 0
      : Math.round((matched.length / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-border bg-card p-8 shadow-sm"
    >
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground">
          Skills Analysis
        </h2>

        <p className="mt-3 text-muted-foreground">
          Your resume matches{" "}
          <span className="font-semibold text-emerald-400">
            {matched.length}
          </span>{" "}
          out of{" "}
          <span className="font-semibold text-foreground">
            {total}
          </span>{" "}
          required skills.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <div>
          <h3 className="mb-5 text-xl font-semibold text-emerald-400">
            Matched Skills
          </h3>

          <div className="flex flex-wrap gap-3">
            {matched.length ? (
              matched.map((skill, index) => (
                <SkillBadge
                  key={index}
                  skill={skill}
                  type="matched"
                />
              ))
            ) : (
              <p className="text-muted-foreground">
                No matched skills found.
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-xl font-semibold text-rose-400">
            Missing Skills
          </h3>

          <div className="flex flex-wrap gap-3">
            {missing.length ? (
              missing.map((skill, index) => (
                <SkillBadge
                  key={index}
                  skill={skill}
                  type="missing"
                />
              ))
            ) : (
              <p className="text-muted-foreground">
                No missing skills.
              </p>
            )}
          </div>
        </div>

      </div>

      <div className="mt-10">
        <div className="mb-2 flex justify-between text-sm font-medium text-foreground">
          <span>Skill Match Rate</span>
          <span className="text-emerald-400">{percentage}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default SkillsSection;
