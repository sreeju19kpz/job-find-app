const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const communityModel = require("../models/communityModel");
const { post } = require("../routes/jobs");

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postModel.find({});
    res.status(200).json({ allPosts });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createPost = async (req, res) => {
  req.body.authorId = req.user.userId;
  try {
    const post = await postModel.create(req.body);
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const singlePost = await postModel.findOne({ _id: req.params.id });
    res.status(200).json({ singlePost });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getPostBanner = async (req, res) => {
  try {
    const singlePost = await postModel.findOne({ _id: req.params.id });
    const { type, _id, authorId, communityId, description } = singlePost;
    res.status(200).json({
      data: {
        _id,
        type,
        authorId,
        communityId,
        description,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getLikes = async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id });
    const { likes } = post;
    res.status(200).json({
      totalLikes: likes.length,
      isLiked:
        likes.filter((item) => item === req.params.uid).length > 0
          ? true
          : false,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getCommentsCount = async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id });
    const { comments } = post;
    res.status(200).json({ data: comments.length });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getAllComments = async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id });

    const { comments } = post;

    res.status(200).json({ data: comments });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const likePost = async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id });

    post.likes.filter((item) => item === req.body.userId).length > 0
      ? post.likes.splice(
          post.likes.map((item) => item).indexOf(req.body.userId),
          1
        )
      : post.likes.unshift(req.body.userId);
    await post.save();

    res.status(201).json({
      isLiked:
        post.likes.filter((item) => item === req.body.userId).length > 0
          ? true
          : false,
      totalLikes: post.likes.length,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getSinglePost,
  getPostBanner,
  likePost,
  getLikes,
  getCommentsCount,
  getAllComments,
};
