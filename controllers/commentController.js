const commentModel = require("../models/commentModel");

const postComment = async (req, res) => {
  try {
    req.body.user = req.user.userId;
    const comment = await commentModel.create({ ...req.body });
    const nComment = await commentModel
      .findOne({ _id: comment._id }, { user: 1, comment: 1, _id: 0 })
      .populate("user", ["name", "dp"])
      .exec();

    res.status(200).json(nComment);
  } catch (err) {}
};
const getAllCommentsFromPost = async (req, res) => {
  try {
    const comments = await commentModel
      .find({ postId: req.params.id }, { user: 1, comment: 1, _id: 0 })
      .populate("user", ["name", "dp"])
      .exec();
    res.status(200).json(comments);
  } catch (err) {}
};

module.exports = { postComment, getAllCommentsFromPost };
