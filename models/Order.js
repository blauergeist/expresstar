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
  recipient: {
    name: {
      type: String,
      required: true
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
