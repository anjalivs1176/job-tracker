import Job from '../models/JobModel.js';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getAllJobs = async (req, res) => {
  try {
    const { search, sortBy, status } = req.query;

    const query = {};

    // 🔍 Search by title, company, or location
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // 🎯 Filter by status
    if (status) {
      query.status = status;
    }

    // 🔃 Sort by salary or date
    let sortOption = {};
    if (sortBy === 'salary') {
      sortOption.salary = -1;
    } else if (sortBy === 'applicationDate') {
      sortOption.applicationDate = -1;
    }

    const jobs = await Job.find(query).sort(sortOption);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Public
const createJob = async (req, res) => {
  try {
    const { title, company, location, salary, status, applicationDate } = req.body;

    if (!title || !company || !location || !applicationDate) {
      return res.status(400).json({ message: 'Title, company, location, and application date are required' });
    }

    const newJob = new Job({
      title,
      company,
      location,
      salary,
      status,
      applicationDate
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update job by ID
// @route   PUT /api/jobs/:id
// @access  Public
const updateJob = async (req, res) => {
  try {
    const { title, company, location, salary, status, applicationDate } = req.body;

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.title = title || job.title;
    job.company = company || job.company;
    job.location = location || job.location;
    job.salary = salary || job.salary;
    job.status = status || job.status;
    job.applicationDate = applicationDate || job.applicationDate;

    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete job by ID
// @route   DELETE /api/jobs/:id
// @access  Public
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.deleteOne();
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// ✅ Export all functions cleanly
export {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};
