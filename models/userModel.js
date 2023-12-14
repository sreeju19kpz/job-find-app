const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  dp: {
    type: String,
    required: false,
  },
  following: {
    type: Array,
    required: false,
  },
  followers: {
    type: Array,
    required: false,
  },
  posts: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("users", userSchema);
