const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 32
  },
  location: {
    city: {
      type: String,
      required: true,
      max: 32
    },
    street: {
      type: String,
      required: true,
      max: 32
    },
    streetnumber: {
      type: String,
      required: true,
      max: 16
    },
    zipcode: {
      type: String,
      required: true,
      max: 16
    },
    phone: {
      type: String,
      required: true,
      max: 32
    }
  },
  company: {
    type: String,
    max: 32
  },
  description: {
    type: String
  },
  social: {
    olx: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  website: {
    type: String
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
