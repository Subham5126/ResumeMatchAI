function SkillBadge({ skill, type }) {
  const styles =
    type === "matched"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-red-100 text-red-700 border-red-300";

  return (
    <span
      className={`px-4 py-2 rounded-full border font-medium ${styles}`}
    >
      {skill}
    </span>
  );
}

export default SkillBadge;