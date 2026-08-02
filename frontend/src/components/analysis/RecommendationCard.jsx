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
  High: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  Medium: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  Low: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
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
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 card-hover-effect cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400 border border-indigo-500/20">
            <Icon size={18} />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {category}
            </span>
            <h3 className="text-xs font-bold text-white">
              {title}
            </h3>
          </div>
        </div>

        <span
          className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${
            priorityBadge[priority] || priorityBadge.Medium
          }`}
        >
          {priority}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-xs leading-relaxed text-slate-300">
        {description}
      </p>

      {/* Action */}
      {action && (
        <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-slate-800 bg-slate-900/90 p-2.5">
          <Lightbulb
            size={14}
            className="mt-0.5 text-amber-400 shrink-0"
          />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Suggested Action
            </p>
            <p className="mt-0.5 text-xs text-slate-200">
              {action}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}