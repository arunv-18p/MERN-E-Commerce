const Product = require("../models/product.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");

// api/v1/products/
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
    if (products.length == -1) return next(new ErrorHandler("No products found", 404));
    res.status(200).json({
        success: true,
        message: "length=" + products.length,
        products,
    });
});

// api/v1/products/:id
const getProductById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    if (!product) return next(new ErrorHandler("Product not found by id", 404));
    res.status(200).json({
        success: true,
        product,
    });
});

// api/v1/products/categories/:category
const getProductByCategory = catchAsyncErrors(async (req, res, next) => {
    const { category } = req.params;
    const products = await Product.find({ category: category });
    if (products.length == 0) return next(new ErrorHandler("No products found", 404));
    res.status(200).json({
        success: true,
        products,
    });
});

// api/v1/products/admin/new
const addProductToDB = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    if (!product) return next(new ErrorHandler("Failed to add product to db"));
    res.status(200).json({
        success: true,
        message: "New product added to db",
        product
    });
});

// api/v1/products/admin/delete/:id
const deleteProductById = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found"), 404);
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product is deleted",
        product
    });
});

// api/v1/products/admin/update/:id
const updateProductById = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found"), 404);
    const newProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Updated product",
        product: newProduct
    });
});

// api/v1/products/:id/review/new
const addProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler("No product found by id", 404));
    const { reviewerName, reviewerEmail, date, comment, rating } = req.body;
    const isAlreadyReviewed = product.reviews.find((review) => {
        return review.reviewerEmail == reviewerEmail;
    });
    // check whether review is already created
    if (isAlreadyReviewed) {
        product.reviews.forEach((review) => {
            if (review.reviewerEmail == reviewerEmail) {
                review.comment = comment;
                review.date = date;
                review.rating = rating;
            }
        });
    } else {
        product.reviews.push({
            reviewerName,
            reviewerEmail,
            date,
            comment,
        });
    }

    await product.save({ validateBeforeSave: true });
    res.status(200).json({
        success: true,
        message: "Review is added to product",
    });
});

// api/v1/products/:id/review/delete
const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found by id"), 404);
    const { reviewerEmail } = req.body;
    const reviews = product.reviews.filter((review) => {
        return review.reviewerEmail != reviewerEmail;
    });
    await Product.findByIdAndUpdate(req.params.id, { reviews },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );
    res.status(200).json({
        success: true,
        message: "Review is deleted from product",
    });
});

module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory,
    addProductToDB,
    deleteProductById,
    updateProductById,
    addProductReview,
    deleteProductReview,
};
