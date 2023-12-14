const { default: mongoose } = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: Array,
    required: true,
  },
  skillsDescription: {
    type: Array,
    required: true,
  },
  seniority: { type: String, required: true },
  companyName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  slots: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  salary: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("jobs", jobSchema);
