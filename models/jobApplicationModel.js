const { default: mongoose } = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "jobs",
  },
  applicant: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
  status: {
    type: String,
    required: true,
    enum: ["Applied", "Reviewing", "Rejected"],
  },
});

module.exports = mongoose.model("jobApplications", jobApplicationSchema);
