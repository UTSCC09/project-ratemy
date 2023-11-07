const express = require("express");

const router = express.Router();
const passport = require("passport");
const querystring = require("querystring");

require("dotenv").config();
// const db = require("../db");

// const ObjectId = require("mongodb").ObjectId;


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
// router.post("/api/user", user.post);
router.get("/api/user",secured, user.userData);

router.post("/api/course", course.post);
router.get("/api/auth/login", loginAuth , auth.login);
router.get("/api/auth/callback", auth.callback);
router.get("/api/auth/logout", auth.logout);






module.exports = router;