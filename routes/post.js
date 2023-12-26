const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  createPost,
  getSinglePost,
  getPostBanner,
  likePost,
  getCommentsCount,
  getAllPostsFromUser,
  getAllPostsFromCommunity,
  getAllPostsForUser,
  getIsLiked,
  /* updatePost,
  deletePost, */
} = require("../controllers/postController");

router.route("/").post(createPost);
router.route("/all").get(getAllPosts);
router.route("/feed/all").get(getAllPostsForUser);
router.route("/community/:id").get(getAllPostsFromCommunity);
router.route("/user/all").get(getAllPostsFromUser);
router
  .route("/:id")
  .get(getSinglePost) /* .post(updatePost).delete(deletePost) */;
router.route("/:id/banner").get(getPostBanner);
router.route("/:id/like").put(likePost);
router.route("/:id/isliked").get(getIsLiked);
router.route("/:id/comments/count").get(getCommentsCount);

module.exports = router;
