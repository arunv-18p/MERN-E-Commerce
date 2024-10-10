const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
        maxLength: [20, "Name cannot exceed 20 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
        maxLength: [20, "Name cannot exceed 20 characters"]
    },
    emailAddress: {
        type: String,
        required: [true, "Please enter your email address"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email address"]
    },
    phCode: {
        type: String,
        required: [true, "Please enter your phone number code"],
        maxLength: [20, "Name cannot exceed 20 characters"]
    },
    phoneNumber: {
        type: String,
        required: [false, "Please enter your phone number"],
        maxLength: [20, "Phone number cannot exceed 20 characters"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Your password must be longer than 6 characters"],
        select: false,
    },
    shippingInfo: {
        type: Object,
        required: false,

        address: {
            type: String,
            required: false
        },
        postalCode: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetTokenSha256: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;