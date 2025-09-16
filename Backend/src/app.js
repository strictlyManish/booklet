const express = require("express");
const app = express();
const cookie_paerser = require('cookie-parser');
const main_route = require("./routes/users.routes");
const getuser = require("./routes/get.routes");



app.use(express.json());
app.use(cookie_paerser());
app.use('/api',main_route);
app.use("/api",getuser);



module.exports = app;