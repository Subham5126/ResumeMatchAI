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
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-blue-100 text-blue-700",
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
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="rounded-xl bg-slate-100 p-3">
            <Icon className="text-slate-700" size={22} />
          </div>

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              {category}
            </p>

            <h3 className="mt-1 text-lg font-semibold text-slate-800">
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
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {description}
      </p>

      {/* Action */}
      {action && (
        <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-3">

          <Lightbulb
            size={18}
            className="mt-0.5 text-indigo-600"
          />

          <div>

            <p className="text-xs font-semibold uppercase text-slate-500">
              Suggested Action
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {action}
            </p>

          </div>

        </div>
      )}
    </motion.div>
  );
}