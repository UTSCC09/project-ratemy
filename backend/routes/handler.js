const express = require("express");

const router = express.Router();

// import mongoose from 'mongoose';
// const ObjectId = require("mongodb").ObjectId;

const user = require("./user");
const course = require("./course");
const review = require("./review");


router.post("/api/reviews", review.postReview);
router.get("/api/reviews", review.getReviews);
router.get("/api/reviews/:courseId", review.getCourseReviews);
router.patch("/api/reviews/:id", review.patchReview);
router.delete("/api/reviews/:id", review.deleteReview);
router.post("/api/user", user.post);
router.get("/api/user/:id", user.get);
router.post("/api/reviews", review.postReview);
router.post("/api/courses", course.post);
router.get("/api/courses", course.getAll);
router.get("/api/courses/:id", course.get);

module.exports = router;