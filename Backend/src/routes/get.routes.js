const express = require("express");
const getuser = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const getProfile = require("../controller/profile.controller");



getuser.post("/creatbooklet",authMiddleware,getProfile);




module.exports = getuser;