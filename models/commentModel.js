const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
  /*   type: {
    type: String,
    required: true,
  },
  replyTo: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: false,
  }, */
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "posts",
    required: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("comments", commentSchema);
