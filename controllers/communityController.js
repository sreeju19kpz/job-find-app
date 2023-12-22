const communityModel = require("../models/communityModel");
const userModel = require("../models/userModel");

const getAllCommunities = async (req, res) => {
  try {
    const allCommunities = await communityModel.find({});
    console.log(req.user);
    res.status(200).json({ allCommunities });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getAllJoinedCommunities = async (req, res) => {
  try {
    const allCommunities = await communityModel.find({
      members: { $in: req.params.uid },
    });
    res.status(200).json(
      allCommunities.map((item) => {
        return {
          name: item.name,
          thumbnail: item.thumbnail,
          members: item.members.length,
        };
      })
    );
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const memberVerify = async (req, res) => {
  try {
    const community = await communityModel.findOne({
      _id: req.params.id,
      members: { $in: req.user.userId },
    });
    console.log(community);
    res.status(200).json(community ? true : false);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getSingleCommunity = async (req, res) => {
  try {
    const Community = await communityModel.findOne({ _id: req.params.id });
    res.status(200).json(Community);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const createCommunity = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    req.body.members = req.user.userId;
    const community = await communityModel.create(req.body);
    res.status(201).json({ community });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getCommunityBanner = async (req, res) => {
  try {
    const Community = await communityModel.findOne({ _id: req.params.id });
    const { name, thumbnail } = Community;
    res.status(200).json({
      data: {
        name: name,
        thumbnail: thumbnail,
        isMember:
          members.filter((item) => item == req.params.uid).length > 0
            ? true
            : false,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getCommunityPosts = async (req, res) => {
  try {
    const Community = await communityModel.findOne({ _id: req.params.id });
    const { posts } = Community;
    res.status(200).json({ data: { posts: posts } });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const joinCommunity = async (req, res) => {
  try {
    const community = await communityModel.findOne({ _id: req.params.id });
    if (
      community.members.filter((item) => item == req.body.userId).length > 0
    ) {
      const Community = await communityModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $pull: { members: req.body.userId } },
        { new: true, runValidators: true }
      );
      await userModel.findOneAndUpdate(
        { _id: req.body.userId },
        { $pull: { following: req.params.id } },
        { new: true, runValidators: true }
      );
      res.status(201).json({
        isMember:
          Community.members.filter((item) => item == req.params.userId).length >
          0
            ? true
            : false,
      });
    } else {
      const Community = await communityModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $push: { members: req.body.userId } },
        { new: true, runValidators: true }
      );
      await userModel.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { following: req.params.id } },
        { new: true, runValidators: true }
      );
      res.status(201).json({
        isMember:
          Community.members.filter((item) => item == req.body.userId).length > 0
            ? true
            : false,
      });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const discoverCommunity = async (req, res) => {
  try {
    const communities = await communityModel.find({
      members: { $nin: req.params.uid },
    });
    res.status(200).json({ id: communities.map((item) => item._id) });
  } catch (err) {
    res.status(500).json({ msg: err });
  }

  // communities.filter((item) => !following.includes(item));
};
module.exports = {
  getAllCommunities,
  getAllJoinedCommunities,
  getSingleCommunity,
  getCommunityBanner,
  memberVerify,
  getCommunityPosts,

  joinCommunity,
  discoverCommunity,
  createCommunity,
};
