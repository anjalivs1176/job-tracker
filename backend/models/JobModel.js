import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['applied', 'interview', 'offer', 'rejected'],
    default: 'applied',
  },
  applicationDate: {
    type: Date,
    required: true,
  }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;
