const express = require("express");

const router = express.Router();
const passport = require("passport");
const querystring = require("querystring");
const { auth } = require('express-oauth2-jwt-bearer');
require("dotenv").config();
// const db = require("../db");



const course = require("./course");





const review = require("./review");
const jwtCheck = auth({
  audience: 'https://ratemy/api',
  issuerBaseURL: 'https://ratemy.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

router.post("/api/reviews", review.postReview);
router.get("/api/reviews/all", review.getReviews);
router.get("/api/reviews/:id", review.getCourseReviews);
router.get("/api/reviews/averages/:id", review.getRatingAverages);
router.patch("/api/reviews/:id", review.patchReview);
router.delete("/api/reviews/:id", review.deleteReview);
router.post("/api/reviews", review.postReview);
router.get("/api/reviews/totals/:id", review.getTotalRatings);
router.post("/api/courses", course.post);
router.get("/api/courses",jwtCheck, course.getAll);
router.get("/api/courses/:id", course.get);

module.exports = router;