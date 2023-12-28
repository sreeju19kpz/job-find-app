const jobApplicationsModel = require("../models/jobApplicationModel");

const applyForJob = async (req, res) => {
  try {
    req.body.applicant = req.user.userId;
    const find = await jobApplicationsModel.findOne({
      applicant: req.body.applicant,
      job: req.body.job,
    });
    const application = find
      ? await jobApplicationsModel.findOneAndDelete(
          {
            applicant: req.body.applicant,
            job: req.body.job,
          },
          { new: true, runValidators: true }
        )
      : await jobApplicationsModel.create({ ...req.body });

    res.status(200).json({ status: find ? "Apply" : application?.status });
  } catch (err) {}
};
const getCurrentJobStatus = async (req, res) => {
  try {
    const rStatus = await jobApplicationsModel.findOne(
      { job: req.params.id, applicant: req.user.userId },
      { status: 1, _id: 0 }
    );

    res.status(200).json({ status: rStatus ? rStatus.status : "Apply" });
  } catch (err) {}
};
const updateApplicationStatus = async (req, res) => {
  try {
    const application = await jobApplicationsModel.findOneAndUpdate(
      { job: req.body.job, applicant: req.body.applicant },
      { $set: { status: req.body.status } },
      { new: true, runValidators: true }
    );
    res.status(200).json({ status: application.status || "Apply" });
  } catch (err) {}
};
const getAllJobsUserApplied = async (req, res) => {
  try {
    const myJobs = await jobApplicationsModel
      .find(
        {
          applicant: req.user.userId,
        },
        { job: 1, status: 1, _id: 0 }
      )
      .populate("job", ["_id", "title", "companyName"]);
    res.status(200).json(myJobs);
  } catch (err) {}
};
module.exports = {
  applyForJob,
  getCurrentJobStatus,
  updateApplicationStatus,
  getAllJobsUserApplied,
};
