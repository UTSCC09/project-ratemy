// Citation: setup code to connect to mongodb https://www.mongodb.com/languages/mern-stack-tutorial

const mongoose = require("mongoose");
// var bcrypt = require('bcrypt-nodejs');

let conn;
const models = {};

const connect = (url) => {
  console.log("[DB] Attempting connection to MongoDB");

  mongoose.connect(url);

  mongoose.connection.on("error", (err) => {
    console.log(err);
    console.log("[DB] ERROR: Unable to connect to MongoDB, shutting down.");
    process.exit(1);
  });
  conn = mongoose.connection;
  conn.once("open", () =>
    console.log("[DB] Connection to MongoDB successful.")
  );
};

const createSchemas = () => {
  const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  });
  const user = mongoose.model("user", userSchema);
  models.user = user;
  const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    professorName: [String],
  });
  const course = mongoose.model("course", courseSchema);
  models.course = course;

  const reviewSchema = new mongoose.Schema({
    course_id: { type: String, required: true },
    rating: {
      difficulty: { type: Number, required: true },
      usefulness_real_world: { type: Number, required: true },
      workload: { type: Number, required: true },
      staff_responsiveness: { type: Number, required: true },
      quality_of_teaching: { type: Number, required: true },
    },
    review: { type: String, required: true },
    email: { type: String, required: true },
    professor: { type: String, required: true },
    date: { type: Date, required: true },
  });
  const review = mongoose.model("review", reviewSchema);
  models.review = review;
};

const init = (url) => {
  connect(url);
  createSchemas();
};

module.exports = {
  conn,
  models,
  init,
};
