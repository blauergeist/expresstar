const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Order = require("../../models/Order");
const Profile = require("../../models/Profile");

// importing Order model validation file
const validateOrderInput = require("../../validation/order");

// @route         GET api/orders/test
// @description   tests orders route
// @access        public
router.get("/test", (req, res) => res.json({ msg: "Orders Works" }));

// @route         POST api/orders
// @description   create a new order
// @access        private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOrderInput(req.body);
    //validation checking
    if (!isValid) {
      //return errors if there are any - status 400
      return res.status(400).json(errors);
    }
    //get the order form info
    const orderFields = {};
    orderFields.user = req.user.id;
    if (req.body.description) orderFields.description = req.body.description;
    if (req.body.status) orderFields.status = req.body.status;
    //recipient
    if (req.body.recName) orderFields.recName = req.body.recName;
    orderFields.recLocation = {};
    if (req.body.recCity) orderFields.recLocation.recCity = req.body.recCity;
    if (req.body.recStreet)
      orderFields.recLocation.recStreet = req.body.recStreet;
    if (req.body.recStreetnumber)
      orderFields.recLocation.recStreetnumber = req.body.recStreetnumber;
    if (req.body.recZipcode)
      orderFields.recLocation.recZipcode = req.body.recZipcode;
    if (req.body.recPhone) orderFields.recLocation.recPhone = req.body.recPhone;
    //sender
    orderFields.sender = {};
    if (req.body.name) orderFields.sender.name = req.user.name;
    if (req.body.street) orderFields.sender.street = req.user.street;
    if (req.body.streetnumber)
      orderFields.sender.streetnumber = req.user.streetnumber;
    if (req.body.zipcode) orderFields.sender.zipcode = req.user.zipcode;
    if (req.body.phone) orderFields.sender.phone = req.user.phone;

    //const newOrder = new Order(orderFields);
    new Order(orderFields)
      .save()
      .then(order => res.json(order))
      .catch(err => res.status(404).json(err));
  }
);

// @route         GET api/orders
// @description   get user's orders
// @access        private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      Order.find({})
        .sort({ date: -1 })
        .then(orders => res.json(orders));
    } else if (req.user.role === "driver") {
      Order.find({ order: req.user.id })
        .sort({ date: -1 })
        .then(orders => res.json(orders));
    } else {
      Order.find({ user: req.user.id })
        .sort({ date: -1 })
        .then(orders => res.json(orders))
        .catch(err => res.status(404).json(err));
    }
  }
);

// @route         GET api/orders/:id
// @description   get an order by ID
// @access        public
router.get("/:id", (req, res) => {
  Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(err =>
      res.status(404).json({ ordernotfound: "No order under this ID" })
    );
});

// @route         DELETE api/orders/:id
// @description   delete or cancel an order
// @access        private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Order.findById(req.params.id)
          .then(order => {
            //checking order status and owner before deleting
            if (order.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: "Unauthorized attempt" });
            }
            //canceling the order if the conditions are met
            order.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(400).json(err));
      })
      .catch(err =>
        res.status(404).json({ ordernotfound: "No order under this ID" })
      );
  }
);

module.exports = router;
