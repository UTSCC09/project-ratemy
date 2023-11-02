const express = require("express");

const router = express.Router();

// const db = require("../db");

// const ObjectId = require("mongodb").ObjectId;


const user = require("./user");
const course = require("./course");
router.post("/api/user", user.post);
router.get("/api/user/:id", user.get);
router.post("/api/course", course.post);
router.get("/api/courses", course.getAll);




module.exports = router;