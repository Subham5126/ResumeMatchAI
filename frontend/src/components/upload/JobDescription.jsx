import { FaBriefcase } from "react-icons/fa";

function JobDescription({
  jobDescription,
  setJobDescription,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">

      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">

        <FaBriefcase className="text-blue-600" />

        Job Description

      </h2>

      <textarea
        rows={8}
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(e.target.value)
        }
        placeholder="Paste the job description here..."
        className="w-full rounded-xl border border-gray-300 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-between items-center mt-3 text-sm text-gray-500">

        <span>
          Paste the complete job description
        </span>

        <span>
          {jobDescription.length} Characters
        </span>

      </div>

    </div>
  );
}

export default JobDescription;