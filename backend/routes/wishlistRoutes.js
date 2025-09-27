const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// POST - Add to wishlist
router.post('/add', wishlistController.addToWishlist);

// GET - Get user's wishlist
router.get('/:userId', wishlistController.getUserWishlist);

// DELETE - Remove item from wishlist
router.delete('/remove', wishlistController.removeFromWishlist);

module.exports = router;
