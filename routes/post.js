const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  createPost,
  getSinglePost,
  /* updatePost,
  deletePost, */
} = require("../controllers/postController");

router.route("/all").get(getAllPosts);
router.route("/").post(createPost);
router
  .route("/:id")
  .get(getSinglePost) /* .post(updatePost).delete(deletePost) */;

module.exports = router;
