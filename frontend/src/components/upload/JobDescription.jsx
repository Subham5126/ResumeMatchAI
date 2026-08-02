import { FaBriefcase } from "react-icons/fa";

function JobDescription({ jobDescription, setJobDescription }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-foreground">
        <FaBriefcase className="text-emerald-400" />
        Job Description
      </h2>

      <textarea
        rows={8}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full resize-none rounded-xl border border-border bg-elevated p-4 text-foreground placeholder:text-muted-foreground focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
      />

      <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>Paste the complete job description</span>
        <span>{jobDescription.length} Characters</span>
      </div>
    </div>
  );
}

export default JobDescription;
