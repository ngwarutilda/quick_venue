const express = require("express");
const router = express.Router();
const { getRecommendation } = require("../controllers/recommendController");

router.get("/", getRecommendation);

module.exports = router;
