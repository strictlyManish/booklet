const express = require("express");
const main_route = express.Router();
const {Register,Login} = require("../controller/main.controller");


main_route.post("/register",Register);
main_route.post("/login",Login);




module.exports = main_route;