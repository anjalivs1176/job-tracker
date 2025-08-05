import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    status: 'applied',
    applicationDate: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token'); // ✅ manually get token

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token in header
          },
        });

        const data = response.data;

        setJob({
          title: data.title || '',
          company: data.company || '',
          location: data.location || '',
          salary: data.salary ? String(data.salary) : '',
          status: data.status || 'applied',
          applicationDate: data.applicationDate ? data.applicationDate.split('T')[0] : '',
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load job');
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: name === 'salary' ? String(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // ✅ manually get token

      const updatedJob = {
        ...job,
        salary: job.salary ? parseInt(job.salary) : undefined,
      };

      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`, updatedJob, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token in header
        },
      });

      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to update job');
    }
  };

  return (
    <div className="edit-job-form max-w-md mx-auto p-4 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Job</h2>
      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Job Title</label>
          <input
            name="title"
            value={job.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Company</label>
          <input
            name="company"
            value={job.company}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Location</label>
          <input
            name="location"
            value={job.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Salary</label>
          <input
            name="salary"
            value={job.salary}
            onChange={handleChange}
            type="number"
            min="0"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={job.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Application Date</label>
          <input
            name="applicationDate"
            type="date"
            value={job.applicationDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
