function SkillBadge({ skill, type }) {
  const styles =
    type === "matched"
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
      : "bg-rose-500/10 text-rose-300 border-rose-500/30";

  return (
    <span
      className={`rounded-full border px-4 py-2 text-sm font-medium ${styles}`}
    >
      {skill}
    </span>
  );
}

export default SkillBadge;
