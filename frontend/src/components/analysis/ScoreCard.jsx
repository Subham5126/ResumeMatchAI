import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ScoreCard({ title, score = 0 }) {
  const value = Math.round(score);

  const getColor = () => {
    if (value >= 80) return "#22C55E";
    if (value >= 60) return "#F59E0B";
    return "#EF4444";
  };

  const getStatus = () => {
    if (value >= 90) return "Excellent";
    if (value >= 75) return "Very Good";
    if (value >= 60) return "Good";
    if (value >= 40) return "Needs Improvement";
    return "Poor";
  };

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mx-auto h-32 w-32">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            pathColor: getColor(),
            textColor: "#0F172A",
            trailColor: "#E2E8F0",
            textSize: "18px",
          })}
        />
      </div>

      <div className="mt-5 text-center">
        <h3 className="text-lg font-bold text-slate-900">
          {title}
        </h3>

        <p
          className="mt-2 text-sm font-medium"
          style={{ color: getColor() }}
        >
          {getStatus()}
        </p>
      </div>
    </motion.div>
  );
}

export default ScoreCard;