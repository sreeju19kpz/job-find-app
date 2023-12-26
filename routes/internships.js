const express = require("express");
const router = express.Router();
const {
  getAllInternships,
  getSingleInternship,
  createInternship,
  getInternshipBanner,
  /*updateInternship,
  deleteInternship, */
} = require("../controllers/internshipController");

router.route("/all").get(getAllInternships);
router.route("/").post(createInternship);
router.route("/:id").get(getSingleInternship);
router.route("/:id/banner").get(getInternshipBanner);
/*.post(updateInternship).delete(deleteInternship) */

module.exports = router;
