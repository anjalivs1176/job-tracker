import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, // ✅ use environment variable
});

// Exported API functions
export const getAllJobs = () => API.get('/jobs');
export const getJobById = (id) => API.get(`/jobs/${id}`);
// export const createJob = (jobData) => API.post('/jobs', jobData);

export const createJob = (jobData) => {
  const token = localStorage.getItem('token');
  return API.post('/jobs', jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export const updateJob = (id, jobData) => API.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);


