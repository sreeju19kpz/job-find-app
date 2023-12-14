const express = require("express");
const app = express();

const jobs = require("./routes/jobs");
const internships = require("./routes/internships");
const communities = require("./routes/community");
const users = require("./routes/user");
const posts = require("./routes/post");

const connectDB = require("./db/connect");
const cors = require("cors");
require("dotenv").config();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/v1/jobs", jobs);
app.use("/api/v1/internships", internships);
app.use("/api/v1/communities", communities);
app.use("/api/v1/users", users);
app.use("/api/v1/posts", posts);

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
