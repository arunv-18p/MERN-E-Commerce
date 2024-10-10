const express = require("express");

const {
    getCurrentUserProfile,
    getAllUsers,
    updateUserById,
    deleteUserById,
    updateUserProfile,
    updatePassword,
} = require("../controllers/userController");

const { isAuthenticated, authorizeRoles } = require("../middlewares/authHandler.js");

const router = express.Router();

router.route("/users/me").get(getCurrentUserProfile);
router.route("/users/me/update").put(isAuthenticated, updateUserProfile);
router.route("/users/me/password/change").post(isAuthenticated, updatePassword);

router.route("/users/admin/all").get(isAuthenticated, authorizeRoles("admin"), getAllUsers);
router.route("/users/admin/update/:id").put(isAuthenticated, authorizeRoles("admin"), updateUserById);
router.route("/users/admin/delete/:id").delete(isAuthenticated, authorizeRoles("admin"), deleteUserById);

module.exports = router;
