import mongoose from 'mongoose';

// 1. Define the Schema
const submissionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid.'],
  },
  phone: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  targetUrl: {
    type: String,
    required: [true, 'Target URL is required.'],
    trim: true,
  },
  scope: {
    type: String,
    trim: true,
  },
  tests: {
    type: [String], // An array of strings
    required: [true, 'At least one test type is required.'],
  },
  consent: {
    type: Boolean,
    required: true,
    validate: {
      validator: (v) => v === true,
      message: 'You must consent to the terms.',
    },
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

// 2. Create the Model from the Schema
const Submission = mongoose.model('Submission', submissionSchema);

// 3. Export the Model
export default Submission;