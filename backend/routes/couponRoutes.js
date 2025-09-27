const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

router.post('/create', couponController.createCoupon);         // Admin
router.get('/', couponController.getAllCoupons);               // Admin/User
router.post('/apply', couponController.applyCoupon);           // User

module.exports = router;
