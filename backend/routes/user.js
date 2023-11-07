const db = require("../db");


exports.userData =  (req, res) => {
    const { _raw, _json, ...userProfile } = req.user;
    return res.json(userProfile);
  }
