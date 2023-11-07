const express = require("express");

const router = express.Router();
const passport = require("passport");
const querystring = require("querystring");

require("dotenv").config();
// const db = require("../db");

const user = require("./user");
const auth = require("./auth");
const course = require("./course");

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  return res.status(401).json({ error: 'Unauthorized' });
};
const loginAuth = (req, res, next) => {
  if (req.user) {
    return res.redirect("localhost:3000");
  }
  next();
};

router.get("/api/user", secured, user.userData);

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
router.get("/api/auth/login", loginAuth, auth.login);
router.get("/api/auth/callback", auth.callback);
router.get("/api/auth/logout", auth.logout);

const review = require("./review");


router.post("/api/reviews", review.postReview);
router.get("/api/reviews/all", review.getReviews);
router.get("/api/reviews/:id", review.getCourseReviews);
router.post("/api/reviews", review.postReview);
router.get("/api/courses", course.getAll);
router.get("/api/courses/:id", course.get);

module.exports = router;