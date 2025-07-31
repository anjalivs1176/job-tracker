import React, { useEffect, useState } from 'react';
import { getAllJobs } from '../api/jobApi';
import JobCard from '../components/JobCard';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>All Job Applications</h1>
      {jobs.length > 0 ? (
        jobs.map(job => <JobCard key={job._id} job={job} />)
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default HomePage;
