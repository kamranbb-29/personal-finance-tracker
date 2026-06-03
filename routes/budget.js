const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middleware/auth");

const { getBudget, updateBudget } = require("../controllers/budget");

router
  .route("/budget")
  .post(authMiddleware, updateBudget)
  .get(authMiddleware, getBudget);

router.route("/budget").patch(authMiddleware, updateBudget);

module.exports = router;
