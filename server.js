const express = require("express");
const app = express();

const jobs = require("./routes/jobs");
const internships = require("./routes/internships");
const communities = require("./routes/community");
const users = require("./routes/user");
const posts = require("./routes/post");
const comments = require("./routes/comment");
const jobApplications = require("./routes/jobApplication");
const internshipApplications = require("./routes/internshipApplication");
const authRout = require("./routes/auth");

const authenticateUser = require("./middleware/authentication");
const connectDB = require("./db/connect");
const cors = require("cors");
require("dotenv").config();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/v1/auth", authRout);
app.use("/api/v1/jobs", authenticateUser, jobs);
app.use("/api/v1/internships", authenticateUser, internships);
app.use("/api/v1/communities", authenticateUser, communities);
app.use("/api/v1/users", authenticateUser, users);
app.use("/api/v1/posts", authenticateUser, posts);
app.use("/api/v1/comments", authenticateUser, comments);
app.use("/api/v1/jobapplications", authenticateUser, jobApplications);
app.use(
  "/api/v1/internshipapplications",
  authenticateUser,
  internshipApplications
);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT || 5000, () => {
      console.log("server on", process.env.PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
