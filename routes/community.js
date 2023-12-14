const express = require("express");
const router = express.Router();

const {
  getAllCommunities,
  getSingleCommunity,
  getCommunityBanner,
  /* updateCommunity,
  deleteCommunity, */
} = require("../controllers/communityController");

router.route("/all").get(getAllCommunities);
router.route("/:id").get(getSingleCommunity);
/*   .post(updateCommunity)
  .delete(deleteCommunity); */
router.route("/:id/banner").get(getCommunityBanner);
module.exports = router;
