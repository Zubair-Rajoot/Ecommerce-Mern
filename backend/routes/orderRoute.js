const express = require("express");
const { isAuthenticatedUser, authorizRoles } = require("../middlewae/auth");
const { newOrder, myOrders, getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");


const router = express.Router();


router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser,authorizRoles('admin'), getSingleOrder);



router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, authorizRoles("admin"), getAllOrders);


router.route('/admin/order/:id').put(isAuthenticatedUser, authorizRoles("admin"), updateOrder)
.delete(isAuthenticatedUser, authorizRoles("admin"), deleteOrder);




module.exports = router