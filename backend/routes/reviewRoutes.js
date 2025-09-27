const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');

// POST - Add
router.post('/', controller.addReview);

// PUT - Update
router.put('/:id', controller.updateReview);

// DELETE
router.delete('/:id', controller.deleteReview);

// GET - All reviews for a product
router.get('/product/:productId', controller.getReviewsByProduct);

// GET - Average rating
router.get('/product/:productId/average', controller.getAverageRating);

module.exports = router;
