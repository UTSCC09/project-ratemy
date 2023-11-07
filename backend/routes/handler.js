const express = require("express");

const router = express.Router();

// const db = require("../db");

// const ObjectId = require("mongodb").ObjectId;


const user = require("./user");
const course = require("./course");
const review = require("./review");


router.post("/api/review", review.postReview);
router.get("/api/reviews", review.getReviews);
router.get("/api/reviews/:courseCode", review.getReviewsByCourseCode);
router.patch("/api/review/:id", review.patchReview);
router.delete("/api/review/:id", review.deleteReview);
router.post("/api/user", user.post);
router.get("/api/user/:id", user.get);
router.post("/api/reviews", review.postReview);
router.post("/api/course", course.post);
router.get("/api/courses", course.getAll);
router.get("/api/course/:id", course.get);

module.exports = router;