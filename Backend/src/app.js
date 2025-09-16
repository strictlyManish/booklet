const express = require("express");
const app = express();
const cookie_paerser = require('cookie-parser');
const main_route = require("./routes/users.routes");
const getuser = require("./routes/get.routes");
const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:5173", // your frontend URL
        credentials: true, // allow cookies/auth headers
    })
);

app.use(express.json());
app.use(cookie_paerser());
app.use('/api', main_route);
app.use("/api", getuser);





module.exports = app;