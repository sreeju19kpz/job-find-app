const { default: mongoose } = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  skillsDescription: {
    type: Array,
    required: true,
  },
  duration: { type: String, required: true },
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
  stipend: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("internships", internshipSchema);
