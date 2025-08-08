import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // jobs per page

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/jobs`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            search: searchTerm,
            sortBy,
            status: statusFilter,
            page: currentPage,
            limit,
          },
        }
      );

      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, sortBy, statusFilter, currentPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs(); // refresh after deletion
    } catch (error) {
      console.error(
        "Error deleting job:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-4 max-w-full overflow-x-hidden">
      {/* 🔹 Filter Controls */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-full">
        <input
          type="text"
          placeholder="Search by title, company, location..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page
          }}
          className="flex-1 min-w-0 w-full sm:w-auto px-3 py-2 border border-gray-300 rounded"
        />

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 min-w-0 w-full sm:w-auto px-3 py-2 border border-gray-300 rounded"
        >
          <option value="">Sort by</option>
          <option value="salary">Salary</option>
          <option value="applicationDate">Date Applied</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 min-w-0 w-full sm:w-auto px-3 py-2 border border-gray-300 rounded"
        >
          <option value="">Filter by status</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
        </select>
      </div>

      {/* 🔹 Job List */}
      {loading ? (
        <p className="text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-full">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} onDelete={handleDelete} />
            ))}
          </div>

          {/* 🔹 Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobList;

