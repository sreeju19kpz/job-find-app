const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  communityId: {
    type: String,
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
