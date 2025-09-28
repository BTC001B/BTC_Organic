const express = require("express");
const controller = require("../controllers/searchController");
const authMiddleware = require("../middlewares/authMiddleware"); 

const router = express.Router();

router.post("/query/:q",authMiddleware.authenticateToken, controller.searchProduct);
router.get("/:id",authMiddleware.authenticateToken,controller.getSearchHistoryByUserId);

module.exports = router;
