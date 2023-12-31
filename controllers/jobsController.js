const jobModel = require("../models/jobModel");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const getAllJobs = async (req, res) => {
  await sleep(1000);
  try {
    const allJobs = await jobModel.find({});
    res.status(200).json(allJobs);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const createJob = async (req, res) => {
  try {
    const job = await jobModel.create(req.body);
    res.status(201).json({ job });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getSingleJobBanner = async (req, res) => {
  try {
    const job = await jobModel.findOne({ _id: req.params.id });
    const {
      title,
      companyName,
      jobType,
      location,
      experience,
      salary,
      skills,
      _id,
    } = job;
    res.status(200).json({
      title,
      companyName,
      jobType,
      location,
      experience,
      salary,
      skills,
      _id,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getSingleJob = async (req, res) => {
  try {
    const job = await jobModel.findOne({ _id: req.params.id });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const applyForJob = async (req, res) => {
  try {
    const allApplicants = await jobModel.findOne(
      { _id: req.body.jobId },
      { applicants: 1, _id: 0 }
    );
    console.log(allApplicants);
    const apply =
      allApplicants.applicants.filter(
        (applicant) => applicant.applicant.toString() == req.user.userId
      ).length > 0
        ? allApplicants.applicants.replaceOne(
            {
              applicant: req.user.userId,
            },
            { applicant: req.user.userId, status: req.body.status },
            { upsert: true }
          )
        : await jobModel.findOneAndUpdate(
            { _id: req.body.jobId },
            {
              $push: {
                applicants: {
                  applicant: req.user.userId,
                  status: req.body.status,
                },
              },
            },
            { new: true, runValidators: true }
          );
    console.log(apply);
    res.status(200).json({
      isApplied:
        apply.applicants.filter((item) => item.applicant == req.user.userId)
          .length > 0
          ? true
          : false,
    });
  } catch (err) {}
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  getSingleJobBanner,
  applyForJob,
};
