import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ScoreCard({ title, score = 0 }) {
  const value = Math.round(score);

  const getColor = () => {
    if (value >= 80) return "#10B981";
    if (value >= 60) return "#F59E0B";
    return "#F43F5E";
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
      className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-emerald-400/40"
    >
      <div className="mx-auto h-32 w-32">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            pathColor: getColor(),
            textColor: "#e6f4ef",
            trailColor: "#1c2f29",
            textSize: "18px",
          })}
        />
      </div>

      <div className="mt-5 text-center">
        <h3 className="font-display text-lg font-bold text-foreground">
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
