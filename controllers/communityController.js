const communityModel = require("../models/communityModel");

const getAllCommunities = async (req, res) => {
  try {
    const allCommunities = await communityModel.find({});
    res.status(200).json({ allCommunities });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getSingleCommunity = async (req, res) => {
  try {
    const Community = await communityModel.findOne({ _id: req.params.id });
    res.status(200).json({ Community });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getCommunityBanner = async (req, res) => {
  try {
    const Community = await communityModel.findOne({ _id: req.params.id });
    const { name, thumbnail } = Community;
    res.status(200).json({ data: { name: name, thumbnail: thumbnail } });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
module.exports = { getAllCommunities, getSingleCommunity, getCommunityBanner };
