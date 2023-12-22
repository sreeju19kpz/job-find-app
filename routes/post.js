const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  createPost,
  getSinglePost,
  getPostBanner,
  likePost,
  getLikes,
  getCommentsCount,
  getAllComments,
  /* updatePost,
  deletePost, */
} = require("../controllers/postController");

router.route("/all").get(getAllPosts);
router.route("/").post(createPost);
router
  .route("/:id")
  .get(getSinglePost) /* .post(updatePost).delete(deletePost) */;
router.route("/:id/banner").get(getPostBanner);
router.route("/:id/likes/:uid").get(getLikes).put(likePost);
router.route("/:id/comments/").get(getAllComments);
router.route("/:id/comments/count").get(getCommentsCount);
module.exports = router;
