import Job from '../models/JobModel.js';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
// @desc    Get all jobs (with pagination)
// @route   GET /api/jobs
// @access  Private
const getAllJobs = async (req, res) => {
  try {
    let { search = '', sortBy = '', status = 'all', page = 1, limit = 6 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = { user: req.user.id };

    // 🔍 Search by title, company, or location
    if (search.trim()) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // 🎯 Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }

    // 🔃 Sort
    let sortOption = {};
    if (sortBy === 'salary') {
      sortOption.salary = -1;
    } else if (sortBy === 'applicationDate') {
      sortOption.applicationDate = -1;
    } else {
      sortOption.createdAt = -1;
    }

    // 📌 Pagination logic
    const skip = (page - 1) * limit;
    const totalJobs = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      jobs,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page
    });
  } catch (error) {
    console.error("🔥 Error in getAllJobs:", error);
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

    if (job.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
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
      applicationDate,
      user: req.user.id
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

    if (job.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
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

// @desc    Update only job status
// @route   PATCH /api/jobs/:id/status
// @access  Public
const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['applied', 'interview', 'offer', 'rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
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

    if (job.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await job.deleteOne();
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  updateJobStatus,
  deleteJob
};
