const User = require("../models/user.js");
const { verifyJWTToken, sendTokenCookie } = require("../utils/tokenUtils.js");
const { getPasswordHash, comparePassword } = require("../utils/passwordUtils.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");

const getUserFromToken = async (token) => {
  const jwtDecoded = await verifyJWTToken(token);
  const userId = jwtDecoded.id;
  const user = await User.findById(userId).select("+password");
  return user;
};

// api/v1/users/me
const getCurrentUserProfile = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler("Please login first"));
  const user = await getUserFromToken(token);
  res.status(200).json({
    success: true,
    user,
  });
});

// api/v1/users/admin/all
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ role: "user" });
  if (users.length == 0) return new ErrorHandler("No users found", 404);
  res.status(200).json({
    success: true,
    users,
  });
});

// api/v1/users/me/update
const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  const user = await getUserFromToken(token);
  const result = await User.findByIdAndUpdate(user.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Updated user profile",
    user: result
  });
});

// api/v1/users/me/password/change
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler("Please login first"));
  const { password, newPassword, confirmPassword } = req.body;
  const user = await getUserFromToken(token);
  if (user) {
    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Current password is wrong"));
    }
    if (newPassword != confirmPassword) {
      return next(new ErrorHandler("Passwords don't match"));
    }
    const passwordHash = await getPasswordHash(newPassword, 10);
    user.password = passwordHash;
    const newUser = await user.save();
    sendTokenCookie(res, 200, newUser);
  }
});

// api/v1/users/admin/update/:id
const updateUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

// api/v1/users/admin/delete/:id
const deleteUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("No user found"));

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "Deleted user",
  });
});

module.exports = {
  getCurrentUserProfile,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserFromToken,
  updateUserProfile,
  updatePassword,
};
