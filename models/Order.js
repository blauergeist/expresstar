const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating schema for an order
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Awaiting pickup"
  },
  driver: {
    type: String
  },

  //rec in front of field names stands for "recipient" - done so that the data of recipient doesn't get confused for the data of the sender
  recName: {
    type: String,
    required: true
  },
  recLocation: {
    recCity: {
      type: String,
      required: true,
      max: 32
    },
    recStreet: {
      type: String,
      required: true,
      max: 32
    },
    recStreetnumber: {
      type: String,
      required: true,
      max: 16
    },
    recZipcode: {
      type: String,
      required: true,
      max: 16
    },
    recPhone: {
      type: String,
      required: true,
      max: 32
    }
  },
  sender: {
    name: {
      type: String
    },
    location: {
      city: {
        type: String,
        max: 32
      },
      street: {
        type: String,
        max: 32
      },
      streetnumber: {
        type: String,
        max: 16
      },
      zipcode: {
        type: String,
        max: 16
      },
      phone: {
        type: String,
        max: 32
      }
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model("order", OrderSchema);
