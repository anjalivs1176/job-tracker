import express from 'express';
const router = express.Router();

import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';

// Base routes: /api/jobs
router.route('/')
  .post(createJob)
  .get(getAllJobs);

// Routes with ID: /api/jobs/:id
router.route('/:id')
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob);

export default router;
