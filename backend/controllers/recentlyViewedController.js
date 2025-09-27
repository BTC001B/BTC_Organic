const RecentlyViewed = require('../models/RecentlyViewed');
const Product = require('../models/Product');

exports.addOrUpdateRecentlyViewed = async (req, res) => {
  const { userId, productId } = req.body;
  try {

    await RecentlyViewed.upsert({
      userId,
      productId,
      viewedAt: new Date()
    });

    res.status(200).json({ message: "Added to recently viewed" });
  } catch (error) {
    res.status(500).json({ message: "Error updating recently viewed", error: error.message });
  }
};

exports.getRecentlyViewed = async (req, res) => {
  const { userId } = req.params;
  try {
    const items = await RecentlyViewed.findAll({
      where: { userId },
      include: [Product],
      order: [['viewedAt', 'DESC']],
      limit: 10
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recently viewed", error: error.message });
  }
};

exports.getRecommendationsFromRecentlyViewed = async (req, res) => {
  const { userId } = req.params;

  try {
    // 1. Get the most recent product viewed by the user
    const lastViewed = await RecentlyViewed.findOne({
      where: { userId },
      include: [Product],
      order: [['viewedAt', 'DESC']]
    });

    if (!lastViewed || !lastViewed.Product) {
      return res.status(404).json({ message: "No recently viewed products found" });
    }

    const categoryId = lastViewed.Product.categoryId;

    // 2. Fetch other products in the same category, sorted by viewCount
    const recommendations = await Product.findAll({
      where: { categoryId },
      order: [['viewCount', 'DESC']],
      limit: 10
    });

    res.status(200).json({
      message: `Top products in category ${categoryId}`,
      recommendations
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching recommendations", 
      error: error.message 
    });
  }
};

