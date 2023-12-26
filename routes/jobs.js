const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  createJob,
  getSingleJob,
  getSingleJobBanner,
  /* updateJob,
  deleteJob, */
} = require("../controllers/jobsController");

router.route("/all").get(getAllJobs);
router.route("/").post(createJob);
router.route("/:id").get(getSingleJob) /* .post(updateJob).delete(deleteJob) */;
router.route("/:id/banner").get(getSingleJobBanner);

module.exports = router;
