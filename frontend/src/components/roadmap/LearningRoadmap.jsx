import { useState } from "react";
import { motion } from "framer-motion";
import { FaRoute, FaMagic, FaClock } from "react-icons/fa";
import RoadmapWeek from "./RoadmapWeek";

export default function LearningRoadmap({ roadmap }) {
  const [expanded, setExpanded] = useState(0);

  if (!roadmap) return null;

  const weeks = Array.isArray(roadmap)
    ? roadmap
    : roadmap.weeks || [];

  const title = Array.isArray(roadmap)
    ? "AI Learning Roadmap"
    : roadmap.title || "AI Learning Roadmap";

  const duration = Array.isArray(roadmap)
    ? `${weeks.length} Weeks`
    : roadmap.duration || `${weeks.length} Weeks`;

  if (!weeks.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 via-white to-indigo-50 px-8 py-6">
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
              <FaRoute size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {title}
              </h2>

              <p className="mt-1 text-slate-500">
                Personalized roadmap generated using AI
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              <FaClock />
              <span>{duration}</span>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
              <FaMagic />
              <span>AI Generated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-8 py-6">
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
    </motion.section>
  );
}