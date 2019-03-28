const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require("../../validation/profile");

//loading profile model
const Profile = require("../../models/Profile");

//loading user profile
const User = require("../../models/User");

// @route         GET api/profile/test
// @description   tests profile route
// @access        public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route         GET api/profile
// @description   get profile of the current user
// @access        private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No profile found for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route         GET api/profile/handle/:handle
// @description   get profile by user handle
// @access        private

router.get(
  "/handle/:handle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.notprofile = "This user does not have a profile";
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route         GET api/profile/user/:user_id
// @description   get profile by user ID
// @access        private

router.get(
  "/user/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.notprofile = "This user does not have a profile";
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err =>
        res
          .status(404)
          .json({ profile: "No profile found for the provided user ID" })
      );
  }
);

// @route         GET api/profile/all
// @description   get all profiles
// @access        private

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.find()
      .populate("user", ["name", "avatar"])
      .then(profiles => {
        if (!profiles) {
          errors.notprofile = "No profiles found";
          return res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: "No profiles found" }));
  }
);

// @route         POST api/profile
// @description   create/update profile for the current user
// @access        private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //validation check
    if (!isValid) {
      //return errors if there are any - status 400
      return res.status(400).json(errors);
    }

    //get form fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.description) profileFields.description = req.body.description;
    if (req.body.website) profileFields.website = req.body.website;
    //social has values stored in an object, so the object needs to be defined first
    profileFields.social = {};
    if (req.body.olx) profileFields.social.olx = req.body.olx;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    //edit - changed location to store values in an object (old comment: location is stored in an array, so accessing all the values individually first needs them to be separateds)
    //if (typeof req.body.location !== "undefined") {
    //  profileFields.location = req.body.location.split(",");
    //}
    profileFields.location = {};
    if (req.body.city) profileFields.location.city = req.body.city;
    if (req.body.street) profileFields.location.street = req.body.street;
    if (req.body.streetnumber)
      profileFields.location.streetnumber = req.body.streetnumber;
    if (req.body.zipcode) profileFields.location.zipcode = req.body.zipcode;
    if (req.body.phone) profileFields.location.phone = req.body.phone;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err));
      } else {
        //create profile

        //handle check
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if (profile) {
              errors.handle = "Handle already in use";
              res.status(400).json(errors);
            }
            //save profile
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile))
              .catch(err => res.status(404).json(err));
          })
          .catch(err => res.status(404).json(err));
      }
    });
  }
);

module.exports = router;
