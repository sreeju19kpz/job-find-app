const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  communityId: {
    type: mongoose.Types.ObjectId,
    ref: "communityModel",
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: false,
  },
  comments: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("posts", postSchema);
