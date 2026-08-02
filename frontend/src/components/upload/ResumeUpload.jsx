import { FaFileUpload, FaFilePdf } from "react-icons/fa";

function ResumeUpload({ resumeFile, setResumeFile }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-foreground">
        <FaFileUpload className="text-emerald-400" />
        Upload Resume
      </h2>

      <label className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-emerald-400/40 bg-elevated transition hover:border-emerald-400 hover:bg-emerald-400/5">
        {resumeFile ? (
          <>
            <FaFilePdf size={42} className="mb-3 text-rose-400" />

            <p className="font-semibold text-foreground">{resumeFile.name}</p>

            <span className="mt-1 text-sm text-emerald-400">
              Resume Uploaded
            </span>
          </>
        ) : (
          <>
            <FaFileUpload size={38} className="mb-3 text-emerald-400" />

            <p className="font-medium text-foreground">Drop Resume Here</p>

            <p className="mt-1 text-sm text-muted-foreground">
              PDF or DOCX (Max 5 MB)
            </p>
          </>
        )}

        <input
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />
      </label>
    </div>
  );
}

export default ResumeUpload;
