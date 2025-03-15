const express = require("express");
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser, authorizRoles } = require("../middlewae/auth");

const router = express.Router();


router.route("/products").get(getAllProducts)
router.route('/admin/product/new').post(isAuthenticatedUser, authorizRoles("admin"), createProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizRoles("admin"), updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizRoles("admin"), deleteProduct);
router.route('/product/:id').get(getProductDetails);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/reviews').get(getProductReviews).delete(deleteReview)


module.exports = router;


