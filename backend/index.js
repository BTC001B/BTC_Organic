const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const recentlyViewedRoutes = require('./routes/recentlyViewedRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const couponRouters = require('./routes/couponRoutes');
const adminRoutes = require('./routes/adminRoutes');
const searchRoutes = require("./routes/searchRoutes");
const orderRoutes = require("./routes/orderRoutes");


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/recently-viewed', recentlyViewedRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/coupons', couponRouters);
app.use('/api/admin', adminRoutes);
app.use('/api/search',searchRoutes);
app.use("/api/order",orderRoutes);


const PORT = process.env.PORT || 3004;


sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .then(() => sequelize.sync())
  .then(() => console.log('Models synced.'))
  .catch(err => console.log('Error: ' + err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
