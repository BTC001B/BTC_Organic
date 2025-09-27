const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add to cart
router.post('/add', cartController.addToCart);

// Get all cart items for a user
router.get('/user/:userId', cartController.getCartByUser);

// Update quantity of a cart item
router.put('/update/:id', cartController.updateCartItem);

// Delete cart item
router.delete('/delete/:id', cartController.deleteCartItem);

// Clear user's entire cart
router.delete('/clear/:userId', cartController.clearCart);

module.exports = router;
