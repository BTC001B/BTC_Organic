const Review = require('../models/Review');
const Product = require('../models/Product');

// Add a review
exports.addReview = async (req, res) => {
  const { userId, productId, rating, comment } = req.body;
  try {
    const review = await Review.create({ userId, productId, rating, comment });
    res.status(201).json({ message: 'Review added', review });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review', error: error.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const review = await Review.findByPk(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.rating = rating;
    review.comment = comment;
    await review.save();

    res.status(200).json({ message: 'Review updated', review });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review', error: error.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Review.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review', error: error.message });
  }
};

// Get all reviews for a product
exports.getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.findAll({ where: { productId } });
    const count = reviews.length;
    res.status(200).json({count:count,review:reviews});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};


exports.getAverageRating = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.findAll({ where: { productId } });
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = reviews.length ? (total / reviews.length).toFixed(1) : 0;
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.rating = avg;
    await product.save();
    res.status(200).json({ averageRating: avg });
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate average rating', error: error.message });
  }
};
