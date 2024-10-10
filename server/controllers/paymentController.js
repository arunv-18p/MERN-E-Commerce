require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");

// api/v1/payment/process
const processPayment = catchAsyncErrors(async (req, res, next) => {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        metadata: {
            integration_check: "accept_a_payment"
        }
    });
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

const getPaymentMethod = catchAsyncErrors(async (req, res, next) => {
    const paymentMethod = await stripe.paymentMethods.retrieve(req.params.id);
    res.status(200).json({
        success: true,
        paymentMethod
    })
})

const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        stripeApiKey: process.env.STRIPE_PUBLIC_KEY
    })
})


module.exports = { processPayment, sendStripeApiKey, getPaymentMethod }