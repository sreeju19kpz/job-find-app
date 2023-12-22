const express = require("express");
const router = express.Router();

const {
  getAllCommunities,
  getSingleCommunity,
  getCommunityBanner,
  getAllJoinedCommunities,
  getCommunityPosts,

  joinCommunity,
  discoverCommunity,
  createCommunity,
  memberVerify,
  /* updateCommunity,
  deleteCommunity, */
} = require("../controllers/communityController");

router.route("/all").get(getAllCommunities);
router.route("/").post(createCommunity);
router.route("/:id").get(getSingleCommunity);
/*   .post(updateCommunity)
  .delete(deleteCommunity); */
router.route("/:id/banner").get(getCommunityBanner);
router.route("/joined/:uid").get(getAllJoinedCommunities);
router.route("/newto/:uid").get(discoverCommunity);
router.route("/:id/ismember").get(memberVerify);
router.route("/:id/posts").get(getCommunityPosts);
router.route("/:id/join").put(joinCommunity);
module.exports = router;
