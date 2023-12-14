const internModel = require("../models/internshipModel");

const getAllInternships = async (req, res) => {
  try {
    const allInternships = await internModel.find({});
    res.status(200).json({ allInternships });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const createInternship = async (req, res) => {
  try {
    const internship = await internModel.create(req.body);
    res.status(201).json({ internship });
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
    res.status(200).json({ internship });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = { getAllInternships, getSingleInternship, createInternship };
