import { Link } from "react-router-dom";

const JobCard = ({ job , onDelete}) => {
  return (
    <div style={styles.card}>
      <h3>{job.title}</h3>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> ₹{job.salary}</p> {/* 💰 Now showing salary */}
      <p><strong>Status:</strong> {job.status}</p>
      <p><strong>Applied On:</strong> {new Date(job.applicationDate).toLocaleDateString()}</p>

      <div style={styles.actions}>
        <Link to={`/edit/${job._id}`} style={styles.edit}>Edit</Link>
      </div>

      <button
          onClick={() => onDelete(job._id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Delete
      </button>



    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    marginBottom: "10px"
  },
  actions: {
    marginTop: "10px"
  },
  edit: {
    color: "#007bff",
    textDecoration: "none"
  }
};

export default JobCard;
