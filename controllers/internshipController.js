const internModel = require("../models/internshipModel");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const getAllInternships = async (req, res) => {
  await sleep(1000);
  try {
    const allInternships = await internModel.find({});
    res.status(200).json(allInternships);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createInternship = async (req, res) => {
  try {
    const internship = await internModel.create(req.body);
    res.status(201).json(internship);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getSingleInternship = async (req, res) => {
  try {
    const internship = await internModel.findOne({ _id: req.params.id });
    if (!internship) {
      return res
        .status(404)
        .json({ msg: `no internsip with id ${req.params.id}` });
    }
    res.status(200).json(internship);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getInternshipBanner = async (req, res) => {
  try {
    const internship = await internModel.findOne({ _id: req.params.id });
    if (!internship) {
      return res
        .status(404)
        .json({ msg: `no internsip with id ${req.params.id}` });
    }
    const {
      title,
      companyName,
      jobType,
      location,
      experience,
      stipend,
      skills,
      _id,
    } = internship;
    res.status(200).json({
      title,
      companyName,
      jobType,
      location,
      experience,
      stipend,
      skills,
      _id,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
module.exports = {
  getAllInternships,
  getSingleInternship,
  createInternship,
  getInternshipBanner,
};
