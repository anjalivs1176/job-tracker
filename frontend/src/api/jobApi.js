import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend API base URL
});

// Exported API functions
export const getAllJobs = () => API.get('/jobs'); // just rename here

export const getJobById = (id) => API.get(`/jobs/${id}`);
export const createJob = (jobData) => API.post('/jobs', jobData);
export const updateJob = (id, jobData) => API.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);


