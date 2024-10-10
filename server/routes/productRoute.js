const express = require("express");
const {
  getAllProducts,
  getProductById,
  getProductByCategory,
  addProductToDB,
  deleteProductById,
  updateProductById,
  addProductReview,
  deleteProductReview
} = require("../controllers/productController.js");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getProductById);
router.route("/products/categories/:category").get(getProductByCategory);
router.route("/products/admin/new").post(addProductToDB);
router.route("/products/admin/delete/:id").delete(deleteProductById);
router.route("/products/admin/update/:id").put(updateProductById);
router.route("/products/:id/review/new/").post(addProductReview);
router.route("/products/:id/review/delete").delete(deleteProductReview)

module.exports = router;
