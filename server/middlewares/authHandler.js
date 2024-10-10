const catchAsyncErrors = require("./catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");
const { getUserFromToken } = require("../controllers/userController.js");

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler("Please login first"));
  const user = await getUserFromToken(token, next);
  if (user) next();
});

const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler("Please login first"));
    const user = await getUserFromToken(token, next);
    if (!roles.includes(user.role)) {
      return next(
        new ErrorHandler("User is not allowed to access this resource", 403)
      );
    }
    next();
  };
};

module.exports = { isAuthenticated, authorizeRoles };
