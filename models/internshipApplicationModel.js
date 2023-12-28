const { default: mongoose } = require("mongoose");

const internshipApplicationSchema = new mongoose.Schema({
  internship: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "internships",
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

module.exports = mongoose.model(
  "internshipApplications",
  internshipApplicationSchema
);
