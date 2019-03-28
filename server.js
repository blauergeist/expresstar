const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const posts = require("./routes/api/posts");
const profiles = require("./routes/api/profile");
const users = require("./routes/api/users");

const app = express();

//middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database configuration
const db = require("./config/keys").mongoURI;

//connecting to mongodb through mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//passport middleware and configuration
app.use(passport.initialize());
require("./config/passport")(passport);

//route usage
app.use("/api/posts", posts);
app.use("/api/profile", profiles);
app.use("/api/users", users);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server is being ran on port ${port}`));
