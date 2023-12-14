const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  getSingleUser,
  getAlljoinedCommunities,
  /* updateUser,
  deleteUser, */
} = require("../controllers/userController");

router.route("/all").get(getAllUsers);
router.route("/").post(createUser);
router
  .route("/:id")
  .get(getSingleUser) /* .post(updateUser).delete(deleteUser) */;
router.route("/:id/communities/").get(getAlljoinedCommunities);

module.exports = router;
