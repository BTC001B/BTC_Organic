    const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const [item, created] = await Wishlist.findOrCreate({ where: { userId, productId } });
    if (!created) return res.status(409).json({ message: 'Already in wishlist' });
    res.status(201).json({ message: 'Added to wishlist', data: item });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to wishlist', error: err.message });
  }
};

exports.getUserWishlist = async (req, res) => {
  const { userId } = req.params;
  try {
    const wishlist = await Wishlist.findAll({
      where: { userId },
      include: [{ model: Product }]
    });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching wishlist', error: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const deleted = await Wishlist.destroy({ where: { userId, productId } });
    if (deleted === 0) return res.status(404).json({ message: 'Item not found in wishlist' });
    res.status(200).json({ message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing from wishlist', error: err.message });
  }
};
