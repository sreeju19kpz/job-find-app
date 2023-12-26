const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  communityId: {
    type: mongoose.Types.ObjectId,
    ref: "communities",
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
});

module.exports = mongoose.model("posts", postSchema);
