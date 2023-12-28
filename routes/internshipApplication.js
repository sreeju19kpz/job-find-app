const express = require("express");
const router = express.Router();

const {
  applyForinternship,
  getCurrentInternshipStatus,
  updateApplicationStatus,
  getAllInternshipsUserApplied,
} = require("../controllers/internshipApplicationController");

router.route("/").post(applyForinternship);
router.route("/all").get(getAllInternshipsUserApplied);
router.route("/:id").get(getCurrentInternshipStatus);
router.route("/:id").put(updateApplicationStatus);

module.exports = router;
