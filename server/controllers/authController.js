const User = require("../models/user.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");

const { getPasswordHash, comparePassword } = require("../utils/passwordUtils.js");
const { sendTokenCookie, getCryptoTokenSha256, getCryptoToken } = require("../utils/tokenUtils.js");

const { sendMail } = require("../utils/emailUtils.js");

// api/v1/users/register
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    emailAddress,
    phCode,
    phoneNumber,
    password,
    confirmPassword,
  } = req.body;

  if (password != confirmPassword) return next(new ErrorHandler("Passwords don't match", 500));
  const passwordHash = await getPasswordHash(password, 10);
  // check whether user is already registered or not
  const isUserExist = await User.findOne({ emailAddress });
  if (isUserExist) return next(new ErrorHandler("User is already registered"));
  const user = {
    firstName,
    lastName,
    emailAddress,
    phCode,
    phoneNumber,
    password: passwordHash,
  };
  const newUser = await User.create(user);
  sendTokenCookie(res, 200, newUser);
});

// api/v1/users/login
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { emailAddress, password } = req.body;
  // check if email and password is entered by user
  if (!emailAddress || !password) return next(new ErrorHandler("Please enter email & password"));
  const user = await User.findOne({ emailAddress }).select("+password");
  // check if user is exist or not
  if (!user) return next(new ErrorHandler("Invalid email or password"));
  // check if password is matched or not
  const isPasswordMatched = await comparePassword(password, user.password.toString());
  if (!isPasswordMatched) return next(new ErrorHandler("Invalid email or password"), 404);
  sendTokenCookie(res, 200, user);
});

// api/v1/users/me/logout
const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ emailAddress: req.body.emailAddress });
  if (!user) return next(new ErrorHandler("No user found", 404));
  const resetToken = await getCryptoToken();
  const resetTokenSha256 = await getCryptoTokenSha256(resetToken);
  user.resetTokenSha256 = resetTokenSha256;
  await user.save({ validateBeforeSave: false });
  const passwordResetURL = `${req.protocol}://${req.get("host")}//users/me/password/reset/${resetTokenSha256}`;
  const message = `
        Dear user,\n\n
        Your password reset url is as follow:\n\n
        ${passwordResetURL}\n\n
        If you haven't requested this, ignore it\n\n
        Thank you
    `;

  await sendMail({
    email: user.emailAddress,
    subject: "Passowrd Recovery",
    message: message,
  });

  res.status(200).json({
    success: true,
    message: "Password reset email sent",
  });
});

const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  const user = await User.findOne({ resetTokenSha256: token });
  if (!user) return next(new ErrorHandler("Password reset token is invalid", 400));
  if (password != confirmPassword) return next(new ErrorHandler("Password doesn't match", 404));
  const passwordHash = await getPasswordHash(password, 10);
  user.password = passwordHash;
  const newUser = await user.save();
  sendTokenCookie(res, 200, newUser);
});

module.exports = { registerUser, loginUser, logoutUser, resetPassword, forgotPassword };
