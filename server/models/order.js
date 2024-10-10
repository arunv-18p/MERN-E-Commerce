const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    billingDetails: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      phCode: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      emailAddress: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    prices: {
      totalPrice: {
        type: Number,
        required: true,
      },
      subTotal: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
      deliveryCharge: {
        type: Number,
        required: true,
      },
    },
    paymentType: {
      type: String,
      required: true,
    },
    cardDetails: {
      last4: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      exp_month: {
        type: String,
        required: true,
      },
      exp_year: {
        type: String,
        required: true,
      },
    },
    orderItems: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    orderStatus: {
      type: String,
      required: true,
      default: "processing",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    paidAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;
