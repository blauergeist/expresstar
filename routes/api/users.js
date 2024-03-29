const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//loading form input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// loading User model
const User = require("../../models/User");

// @route         GET api/users/test
// @description   tests users route
// @access        public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route         GET api/users/register
// @description   register a new user
// @access        public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //validation checking
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already in use" });
    } else {
      //storing gravatar image into a variable
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Image size
        r: "pg", // Image rating allowed
        d: "mm" // Default to show if no image
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route         GET api/users/login
// @description   user login / return jwt
// @access        public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //validation checking
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find a user by email
  User.findOne({ email }).then(user => {
    // check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //pasword check
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user match
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          role: user.role
        }; // jwt payload
        // sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Passowrd incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route         GET api/users/current
// @description   returning current user
// @access        private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    });
  }
);

router.get(
  "/drivers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      User.find({ role: "driver" })
        .sort({ date: -1 })
        .then(users => res.json(users));
    } else {
      res.status(401).json(err);
    }
  }
);

module.exports = router;
