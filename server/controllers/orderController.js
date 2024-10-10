const Order = require("../models/order.js");
const Product = require("../models/product.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const { getUserFromToken } = require("../controllers/userController.js");

// api/v1/users/me/orders/new
const newOrder = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  const user = await getUserFromToken(token);
  const { billingDetails, userRef, orderItems, prices, paymentType, cardDetails } = req.body;
  const order = await Order.create({
    orderItems,
    billingDetails,
    prices,
    cardDetails,
    paymentType,
    user: userRef,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

// api/v1/users/me/orders
const getMyOrders = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  const user = await getUserFromToken(token);
  const orders = await Order.find({ user: user.id });
  res.status(200).json({
    success: true,
    orders,
  });
});

const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = Order.find();
  if (orders.length == 0) {
    return next(new ErrorHandler("No orders found"), 404);
  }
  res.status(200).json({
    success: true,
    orders,
  });
});

const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("No order found with id"), 404);
  }
  const result = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.json({
    success: true,
    result,
  });
});

const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("No order found with id"), 404);
  }
  const result = await order.deleteOne();
  res.status(200).json({
    success: true,
    result,
  });
});

module.exports = { newOrder, getMyOrders, getAllOrders, updateOrder, deleteOrder };
