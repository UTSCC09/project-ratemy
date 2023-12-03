const express = require("express");

const router = express.Router();
const passport = require("passport");
const querystring = require("querystring");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();
// const db = require("../db");



const openai = require("./openAi");
const course = require("./course");
const payment = require("./payment");
const review = require("./review");
//Citation: https://auth0.com/blog/complete-guide-to-react-user-authentication/
//Citation: https://auth0.com/docs/quickstart/backend/nodejs/interactive
const jwtCheck = auth({
  audience: "https://ratemy/api",
  issuerBaseURL: "https://ratemy.us.auth0.com/",
  tokenSigningAlg: "RS256",
});
router.post("/api/ask",jwtCheck, openai.post);
router.post("/api/reviews",jwtCheck, review.postReview);
router.get("/api/reviews/all", review.getReviews);
router.get("/api/reviews/:id", review.getCourseReviews);
router.get("/api/reviews/averages/:id", review.getRatingAverages);
router.patch("/api/reviews/:id",jwtCheck, review.patchReview);
router.delete("/api/reviews/:id",jwtCheck, review.deleteReview);
router.get("/api/reviews/totals/:id", review.getTotalRatings);
router.post("/api/courses",jwtCheck, course.post);
router.get("/api/courses/search/:substring", course.search);
router.get("/api/courses", course.getAll);
router.get("/api/courses/:id", course.get);
router.post("/api/payment",jwtCheck, payment.post);
router.get("/api/isSubscribed", payment.getIsSubscribed);
router.post("/api/isSubscribed",jwtCheck, payment.postIsSubscribed);

module.exports = router;
