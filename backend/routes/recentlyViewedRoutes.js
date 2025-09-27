const express = require('express');
const router = express.Router();
const controller = require('../controllers/recentlyViewedController');

// POST - Add or update recently viewed
router.post('/add', controller.addOrUpdateRecentlyViewed);

// GET - Get user's recently viewed products
router.get('/:userId', controller.getRecentlyViewed);


router.get("/toppic/:userId",controller.getRecommendationsFromRecentlyViewed);

module.exports = router;
