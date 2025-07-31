import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('applied');
  const [salary, setSalary] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !company || !location || !applicationDate) {
      setError('All required fields must be filled');
      return;
    }

    const job = {
      title,
      company,
      location,
      status,
      salary,
      applicationDate, // ✅ This is now included
    };

    try {
      await axios.post('http://localhost:5000/api/jobs', job);
      navigate('/');
    } catch (error) {
      console.error('🔥 Backend Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="add-job-form max-w-md mx-auto p-4 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Job</h2>
      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Job Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter job title"
          />
        </div>
        <div>
          <label className="block font-medium">Company *</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label className="block font-medium">Location *</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter location"
          />
        </div>
        <div>
          <label className="block font-medium">Salary (Optional)</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter salary"
          />
        </div>
        <div>
          <label className="block font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Application Date *</label>
          <input
            type="date"
            value={applicationDate}
            onChange={(e) => setApplicationDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
