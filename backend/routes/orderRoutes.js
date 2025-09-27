const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware"); // if you have auth

router.post("/create", authMiddleware.authenticateToken, orderController.createOrder);
// router.get("/user-orders", authMiddleware, orderController.getUserOrders); 

module.exports = router;
