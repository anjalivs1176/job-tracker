// import { useEffect, useState } from "react";
// import axios from "axios";
// import JobCard from "./JobCard";

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // New state for search, sort, filter
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState(""); // "salary" or "date"
//   const [statusFilter, setStatusFilter] = useState(""); // Applied / Interview / Rejected

//   const fetchJobs = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/jobs", {
//         params: {
//           search: searchTerm,
//           sortBy,
//           status: statusFilter
//         }
//       });
//       setJobs(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, [searchTerm, sortBy, statusFilter]); // re-fetch on change

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this job?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/jobs/${id}`);
//       setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
//     } catch (error) {
//       console.error("Error deleting job:", error);
//     }
//   };

//   return (
//     <div style={styles.wrapper}>
//       {/* Filter Controls */}
//       <div style={styles.controls}>
//         <input
//           type="text"
//           placeholder="Search by title, company, location..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={styles.input}
//         />

//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.input}>
//           <option value="">Sort by</option>
//           <option value="salary">Salary</option>
//           <option value="applicationDate">Date Applied</option>
//         </select>

//         <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.input}>
//           <option value="">Filter by status</option>
//           <option value="applied">Applied</option>
//           <option value="interview">Interview</option>
//           <option value="rejected">Rejected</option>
//         </select>
//       </div>

//       {/* Job Cards */}
//       {loading ? (
//         <p>Loading jobs...</p>
//       ) : jobs.length === 0 ? (
//         <p>No jobs found.</p>
//       ) : (
//         <div style={styles.container}>
//           {jobs.map((job) => (
//             <JobCard key={job._id} job={job} onDelete={handleDelete} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   wrapper: {
//     padding: "20px"
//   },
//   controls: {
//     display: "flex",
//     gap: "10px",
//     marginBottom: "20px"
//   },
//   input: {
//     padding: "8px",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//     flex: 1
//   },
//   container: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//     gap: "20px"
//   }
// };

// export default JobList;


import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/jobs", {
        params: { search: searchTerm, sortBy, status: statusFilter }
      });
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, sortBy, statusFilter]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="p-4 overflow-x-hidden">
      {/* ✅ Responsive Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title, company, location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded"
        >
          <option value="">Sort by</option>
          <option value="salary">Salary</option>
          <option value="applicationDate">Date Applied</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded"
        >
          <option value="">Filter by status</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* ✅ Responsive Job Card Grid */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
