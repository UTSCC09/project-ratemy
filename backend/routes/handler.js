const express = require("express");

const router = express.Router();
const passport = require("passport");
const querystring = require("querystring");

require("dotenv").config();
// const db = require("../db");

const user = require("./user");
const auth = require("./auth");
const course = require("./course");
const payment = require("./payment");

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  return res.status(401).json({ error: "Unauthorized" });
};
const loginAuth = (req, res, next) => {
  if (req.user) {
    return res.redirect("localhost:3000");
  }
  next();
};

router.get("/api/user", secured, user.userData);

const review = require("./review");

router.post("/api/reviews", review.postReview);
router.get("/api/reviews/all", review.getReviews);
router.get("/api/reviews/:id", review.getCourseReviews);
router.get("/api/reviews/averages/:id", review.getRatingAverages);
router.patch("/api/reviews/:id", review.patchReview);
router.delete("/api/reviews/:id", review.deleteReview);
router.post("/api/reviews", review.postReview);
router.get("/api/reviews/totals/:id", review.getTotalRatings);
router.get("/api/auth/login", loginAuth, auth.login);
router.get("/api/auth/callback", auth.callback);
router.get("/api/auth/logout", auth.logout);
router.post("/api/courses", course.post);
router.get("/api/courses", course.getAll);
router.get("/api/courses/:id", course.get);
router.post("/api/payment", payment.post);

module.exports = router;
