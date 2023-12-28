const internshipApplicationModel = require("../models/internshipApplicationModel");

const applyForinternship = async (req, res) => {
  try {
    req.body.applicant = req.user.userId;
    const application = await internshipApplicationModel.create({
      ...req.body,
    });
    res.status(200).json(application);
  } catch (err) {}
};
const getCurrentInternshipStatus = async (req, res) => {
  try {
    const status = await internshipApplicationModel.findOne(
      { internship: req.params.id, applicant: req.user.userId },
      { status: 1, _id: 0 }
    );
    res.status(200).json(status);
  } catch (err) {}
};
const updateApplicationStatus = async (req, res) => {
  try {
    const application = await internshipApplicationModel.findOneAndUpdate(
      { internship: req.params.id, applicant: req.user.userId },
      { $set: { status: req.body.status } },
      { new: true, runValidators: true }
    );
    res.status(200).json(application.status);
  } catch (err) {}
};
const getAllInternshipsUserApplied = async (req, res) => {
  try {
    const myInnternships = await internshipApplicationModel
      .find({
        applicant: req.user.userId,
      })
      .populate("internship", ["_id", "title", "companyName"]);
    res.status(200).json(myInnternships);
  } catch (err) {}
};

module.exports = {
  applyForinternship,
  getCurrentInternshipStatus,
  updateApplicationStatus,
  getAllInternshipsUserApplied,
};
