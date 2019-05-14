const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const orders = require("./routes/api/orders");
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
app.use("/api/orders", orders);
app.use("/api/profile", profiles);
app.use("/api/users", users);

//static assets for production
if (process.env.NODE_ENV === "production") {
  //set a static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is being ran on port ${PORT}`));
