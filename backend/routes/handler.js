const express = require("express");

const router = express.Router();

// const db = require("../db");

// const ObjectId = require("mongodb").ObjectId;


const user = require("./user");

router.post("/api/user", user.post);
router.get("/api/user/:id", user.get);




module.exports = router;