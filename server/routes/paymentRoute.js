const express = require("express");

const { processPayment, sendStripeApiKey, getPaymentMethod } = require("../controllers/paymentController.js")
const { isAuthenticated } = require("../middlewares/authHandler.js");

const router = express.Router();

router.route("/payment/process").post(isAuthenticated, processPayment);
router.route("/payment/public/key").get(sendStripeApiKey);
router.route("/payment/payment_methods/:id").get(getPaymentMethod);

module.exports = router;