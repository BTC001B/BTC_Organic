const  Coupon  = require('../models/Coupon');

// Create a new coupon
exports.createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ message: "Coupon created", coupon });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Apply coupon (for users)
exports.applyCoupon = async (req, res) => {
  const { code, cartTotal } = req.body;

  try {
    const coupon = await Coupon.findOne({ where: { code } });

    if (!coupon) return res.status(404).json({ message: "Invalid coupon code" });

    if (!coupon.status || new Date() > new Date(coupon.expiryDate))
      return res.status(400).json({ message: "Coupon expired or inactive" });

    if (cartTotal < coupon.minAmount)
      return res.status(400).json({ message: `Minimum cart value is ₹${coupon.minAmount}` });

    if (coupon.usedCount >= coupon.maxUsage)
      return res.status(400).json({ message: "Coupon usage limit exceeded" });

    let discount = coupon.discountType === 'flat'
      ? coupon.discountValue
      : (coupon.discountValue / 100) * cartTotal;

    discount = Math.floor(discount);

    res.json({
      success: true,
      discount,
      finalAmount: cartTotal - discount
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
};
