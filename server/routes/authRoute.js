const express = require("express");
const { registerUser, loginUser, logoutUser, resetPassword, forgotPassword } = require("../controllers/authController");

const router = express.Router();

router.route("/users/register").post(registerUser);
router.route("/users/login").post(loginUser);
router.route("/users/me/logout").get(logoutUser);
router.route("/users/me/password/forgot").post(forgotPassword);
router.route("/users/me/password/reset/:token").post(resetPassword);

module.exports = router;