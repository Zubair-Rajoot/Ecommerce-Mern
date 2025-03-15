const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getSingleUser, getAllUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizRoles } = require('../middlewae/auth');


const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/me').get(isAuthenticatedUser ,getUserDetails);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logout);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);


router.route('/me/update').put(isAuthenticatedUser, updateProfile);

router.route('/admin/users').get(isAuthenticatedUser, authorizRoles("admin"), getAllUser);

router.route('/admin/user/:id').get(isAuthenticatedUser, authorizRoles("admin"), getSingleUser);

router.route('/admin/user/:id').put(isAuthenticatedUser, authorizRoles("admin"), updateUserRole);

router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizRoles("admin"), deleteUser);




module.exports = router
