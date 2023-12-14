const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const communityModel = require("../models/communityModel");
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postModel.find({});
    res.status(200).json({ allPosts });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const createPost = async (req, res) => {
  try {
    const post = await postModel.create(req.body);
    if (post.type === "COMMUNITY_POST") {
      await communityModel.findByIdAndUpdate(
        { _id: post.communityId },
        { $push: { posts: post._id.toString() } }
      );
      // const community = await communityModel.findOne({ _id: post.communityId });
    }
    await userModel.findByIdAndUpdate(
      { _id: post.authorId },
      { $push: { posts: post._id.toString() } }
    );
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getSinglePost = async (req, res) => {
  try {
    const singlePost = await postModel.findOne({ _id: req.params.id });
    res.status(200).json({ singlePost });
  } catch (err) {}
};

module.exports = { getAllPosts, createPost, getSinglePost };
