import express from 'express';
const router = express.Router();

import protect from '../middleware/authMiddleware.js';
import { updateJobStatus } from '../controllers/jobController.js';




import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';

// Base routes: /api/jobs
router.route('/')
  .post(protect, createJob)
  .get(protect, getAllJobs);

router.patch('/:id/status', protect, updateJobStatus);

// Routes with ID: /api/jobs/:id
router.route('/:id')
  .get(protect, getJobById)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

export default router;
