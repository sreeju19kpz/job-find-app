const express = require("express");
const router = express.Router();
const {
  getAllInternships,
  getSingleInternship,
  createInternship,
  /*updateInternship,
  deleteInternship, */
} = require("../controllers/internshipController");

router.route("/all").get(getAllInternships);
router.route("/").post(createInternship);
router.route("/:id").get(getSingleInternship);
/*.post(updateInternship).delete(deleteInternship) */

module.exports = router;
