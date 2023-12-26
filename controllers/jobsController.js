const jobModel = require("../models/jobModel");

const getAllJobs = async (req, res) => {
  try {
    const allJobs = await jobModel.find({});
    res.status(200).json(allJobs.map((item) => item._id));
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

module.exports = { getAllJobs, getSingleJob, createJob, getSingleJobBanner };
