import { motion } from "framer-motion";
import {
  Mail,
  Code2,
  FolderGit2,
  Award,
  User,
  Briefcase,
  GraduationCap,
  FileText,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

const icons = {
  Contact: Mail,
  Skills: Code2,
  Projects: FolderGit2,
  Certifications: Award,
  Profile: User,
  Experience: Briefcase,
  Education: GraduationCap,
  Resume: FileText,
  Optimization: Lightbulb,
};

const priorityBadge = {
  High: "bg-rose-500/15 text-rose-300",
  Medium: "bg-amber-500/15 text-amber-300",
  Low: "bg-emerald-500/15 text-emerald-300",
};

export default function RecommendationCard({ recommendation }) {
  const {
    title = "Recommendation",
    description = "",
    priority = "Medium",
    category = "Resume",
    action,
  } = recommendation;

  const Icon = icons[category] || AlertCircle;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-emerald-400/40 hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="rounded-xl bg-emerald-500/10 p-3">
            <Icon className="text-emerald-300" size={22} />
          </div>

          <div>

            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {category}
            </p>

            <h3 className="mt-1 text-lg font-semibold text-foreground">
              {title}
            </h3>

          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            priorityBadge[priority]
          }`}
        >
          {priority}
        </span>

      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      {/* Action */}
      {action && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-secondary p-3">

          <Lightbulb
            size={18}
            className="mt-0.5 text-emerald-300"
          />

          <div>

            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Suggested Action
            </p>

            <p className="mt-1 text-sm text-foreground">
              {action}
            </p>

          </div>

        </div>
      )}
    </motion.div>
  );
}
