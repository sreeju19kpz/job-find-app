const userModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const allusers = await userModel.find({});
    res.status(200).json({ allusers });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const createUser = async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getSingleUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getAlljoinedCommunities = async (req, res) => {
  try {
    const result = await userModel.findOne({ _id: req.params.id });
    const { following } = result;
    res.status(200).json({ communities: following });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getSingleUser,
  getAlljoinedCommunities,
};