const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');


const adminController =require('../controllers/adminController');

router.post('/login',adminController.adminLogin);

module.exports = router;
