const express = require("express");
const controller = require("../controllers/searchController");

const router = express.Router();


router.post("/query/:q", controller.searchProduct);

module.exports = router;
