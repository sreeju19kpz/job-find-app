const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const communityModel = require("../models/communityModel");
const { post } = require("../routes/jobs");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postModel.find({});
    res.status(200).json({ allPosts });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getAllPostsFromUser = async (req, res) => {
  try {
    const allPosts = await postModel
      .find({ authorId: req.user.userId })
      .populate("authorId", ["name", "thumbnail"])
      .populate("communityId", "name")
      .exec();
    res.status(200).json(
      allPosts.map((item) => {
        return {
          _id: item._id,
          type: item.type,
          authorId: item.authorId,
          communityId: item.communityId,
          description: item.description,
          isLiked:
            item.likes.filter((item) => item === req.user.userId).length > 0
              ? true
              : false,
        };
      })
    );
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createPost = async (req, res) => {
  req.body.authorId = req.user.userId;
  try {
    const post = await postModel.create(req.body);
    const rPost = await postModel
      .findOne({ _id: post._id.toString() })
      .populate("authorId", ["name", "dp", "_id"])
      .populate("communityId", ["name", "_id"]);
    res.status(201).json(rPost);
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
const getAllPostsFromCommunity = async (req, res) => {
  try {
    const rPosts = await postModel
      .find()
      .where("communityId")
      .equals(req.params.id)
      .populate("authorId", ["name", "thumbnail"])
      .populate("communityId", "name")
      .exec();
    const posts = rPosts.map((post) => {
      return {
        _id: post._id,
        type: post.type,
        authorId: post.authorId,
        communityId: post.communityId,
        description: post.description,
        isLiked:
          post.likes.filter((item) => item === req.user.userId).length > 0
            ? true
            : false,
      };
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getAllPostsForUser = async (req, res) => {
  await sleep(1000);
  try {
    const groups = await communityModel.find({
      members: { $in: req.user.userId },
    });
    const idGroups = groups.map((item) => item._id);
    const rPosts = await postModel
      .find({
        communityId: { $in: idGroups },
      })
      .populate("authorId", ["name", "dp", "_id"])
      .populate("communityId", ["name", "_id"]);
    const posts = rPosts.map((post) => {
      return {
        _id: post._id,
        type: post.type,
        authorId: post.authorId,
        communityId: post.communityId,
        description: post.description,
        isLiked:
          post.likes.filter((item) => item === req.user.userId).length > 0
            ? true
            : false,
      };
    });

    res.status(200).json(posts);
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

const likePost = async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id });
    const data =
      post.likes.filter((item) => item === req.user.userId).length > 0
        ? await postModel.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { likes: req.user.userId } },
            { new: true, runValidators: true }
          )
        : await postModel.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { likes: req.user.userId } },
            { new: true, runValidators: true }
          );
    res.status(201).json({
      data:
        data.likes.filter((item) => item === req.user.userId).length > 0
          ? true
          : false,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getIsLiked = async (req, res) => {
  try {
    const post = await postModel.findOne(
      { _id: req.params.id },
      { likes: 1, _id: 0 }
    );

    res.status(200).json({
      isLiked:
        post.likes.filter((item) => item === req.user.userId).length > 0
          ? true
          : false,
    });
  } catch (err) {}
};

module.exports = {
  getAllPosts,
  createPost,
  getSinglePost,
  getPostBanner,
  likePost,
  getIsLiked,
  getCommentsCount,
  getAllPostsFromUser,
  getAllPostsFromCommunity,
  getAllPostsForUser,
};
