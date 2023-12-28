const express = require("express");
const router = express.Router();
const {
  applyForJob,
  getCurrentJobStatus,
  updateApplicationStatus,
  getAllJobsUserApplied,
} = require("../controllers/jobApplicationController");

router.route("/").post(applyForJob);
router.route("/all").get(getAllJobsUserApplied);
router.route("/:id").get(getCurrentJobStatus);
router.route("/:id").put(updateApplicationStatus);
module.exports = router;
