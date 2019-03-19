const express = require("express");
const mongoose = require("mongoose");

const posts = require("./routes/api/posts");
const profiles = require("./routes/api/profile");
const users = require("./routes/api/users");

const app = express();

//database config
const db = require("./config/keys").mongoURI;

//connecting to mongodb through mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
app.get("/", (req, res) => res.send("Hello"));

//route usage
app.use("/api/posts", posts);
app.use("/api/profiles", profiles);
app.use("/api/users", users);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server is being ran on port ${port}`));
