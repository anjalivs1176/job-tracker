import { Link } from "react-router-dom";
import { FaBuilding, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const JobCard = ({ job, onDelete }) => {
  const borderColor =
    job.status === "offer"
      ? "border-green-500"
      : job.status === "applied"
      ? "border-blue-500"
      : "border-yellow-500";

  const formattedSalary = job.salary
    ? `₹${Number(job.salary).toLocaleString("en-IN")}`
    : "Not specified";

  const daysSinceApplied = Math.floor(
    (Date.now() - new Date(job.applicationDate)) / (1000 * 60 * 60 * 24)
  );

  const statusColor =
    job.status === "offer"
      ? "bg-green-500"
      : job.status === "applied"
      ? "bg-blue-500"
      : "bg-yellow-500";

  return (
    <div
      className={`p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 border-l-4 ${borderColor} bg-white break-words`}
    >
      <h3 className="text-lg font-semibold mb-2">{job.title}</h3>

      <p className="flex items-center gap-2">
        <FaBuilding className="text-gray-600" />
        <strong>Company:</strong> {job.company}
      </p>

      <p className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-red-500" />
        <strong>Location:</strong> {job.location}
      </p>

      <p className="flex items-center gap-2 font-bold text-green-600">
        <FaRupeeSign />
        Salary: {formattedSalary}
      </p>

      {/* Status badge */}
      <div className="mt-2">
        <span
          className={`px-2 py-1 rounded-full text-white text-sm ${statusColor}`}
        >
          {job.status}
        </span>
      </div>

      <p className="text-gray-500 text-sm mt-1">
        Applied On: {new Date(job.applicationDate).toLocaleDateString()} •{" "}
        {daysSinceApplied} days ago
      </p>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Link
          to={`/edit/${job._id}`}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm sm:text-base"
        >
          Edit
        </Link>
        <button
          onClick={() =>
            window.confirm("Are you sure you want to delete this job?") &&
            onDelete(job._id)
          }
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm sm:text-base"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
