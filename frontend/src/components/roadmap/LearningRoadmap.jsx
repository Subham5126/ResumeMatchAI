import { useState } from "react";
import { FaRoute, FaMagic, FaClock } from "react-icons/fa";
import RoadmapWeek from "./RoadmapWeek";

export default function LearningRoadmap({ roadmap }) {
  const [expanded, setExpanded] = useState(0);

  if (!roadmap) return null;

  const weeks = Array.isArray(roadmap)
    ? roadmap
    : roadmap.weeks || [];

  const title = Array.isArray(roadmap)
    ? "4-Week AI Upskilling Roadmap"
    : roadmap.title || "4-Week AI Upskilling Roadmap";

  const duration = Array.isArray(roadmap)
    ? `${weeks.length} Weeks`
    : roadmap.duration || `${weeks.length} Weeks`;

  if (!weeks.length) return null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-2xs">
            <FaRoute size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              {title}
            </h2>
            <p className="text-xs text-slate-400">
              Personalized step-by-step skill gap remediation timeline.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-xs font-bold text-indigo-300">
            <FaClock size={12} />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-xs font-bold text-purple-300">
            <FaMagic size={12} />
            <span>Groq AI Roadmap</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {weeks.map((week, index) => (
          <RoadmapWeek
            key={week.week}
            week={week}
            index={index}
            expanded={expanded === index}
            onToggle={() =>
              setExpanded(expanded === index ? null : index)
            }
          />
        ))}
      </div>
    </div>
  );
}