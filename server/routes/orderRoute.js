const express = require("express");

const { newOrder, getMyOrders, updateOrder, deleteOrder, getAllOrders } = require("../controllers/orderController")
const { isAuthenticated, authorizeRoles } = require("../middlewares/authHandler.js");

const router = express.Router();

router.route("/users/me/orders/new").post(isAuthenticated, newOrder);
router.route("/users/me/orders").get(isAuthenticated, getMyOrders);
router.route("/users/admin/orders/all").get(isAuthenticated, authorizeRoles("admin"), getAllOrders);
router.route("/users/admin/orders/:id/update").put(isAuthenticated, authorizeRoles("admin"), updateOrder);
router.route("/users/admin/orders/:id/delete").delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

module.exports = router;