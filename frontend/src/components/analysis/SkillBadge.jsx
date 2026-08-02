function SkillBadge({ skill, type }) {
  const styles =
    type === "matched"
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
      : "bg-rose-500/10 text-rose-300 border-rose-500/30";

  return (
    <span
      className={`px-3 py-1 rounded-md border text-xs font-semibold ${styles}`}
    >
      {skill}
    </span>
  );
}

export default SkillBadge;