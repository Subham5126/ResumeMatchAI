import { FaFileUpload, FaFilePdf } from "react-icons/fa";

function ResumeUpload({ resumeFile, setResumeFile }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">

      <h2 className="text-xl font-bold text-gray-800 mb-4">
        📄 Upload Resume
      </h2>

      <label className="border-2 border-dashed border-blue-400 rounded-xl h-44 flex flex-col justify-center items-center cursor-pointer hover:bg-blue-50 transition">

        {resumeFile ? (
          <>
            <FaFilePdf
              size={42}
              className="text-red-500 mb-3"
            />

            <p className="font-semibold text-gray-800">
              {resumeFile.name}
            </p>

            <span className="text-sm text-green-600 mt-1">
              ✓ Resume Uploaded
            </span>
          </>
        ) : (
          <>
            <FaFileUpload
              size={38}
              className="text-blue-600 mb-3"
            />

            <p className="font-medium text-gray-700">
              Drop Resume Here
            </p>

            <p className="text-sm text-gray-500 mt-1">
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