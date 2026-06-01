const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middleware/auth");

const { getBudget, addBudget, updateBudget } = require("../controllers/budget");

router
  .route("/budget")
  .post(authMiddleware, addBudget)
  .get(authMiddleware, getBudget);

router.route("/budget").patch(authMiddleware, updateBudget);

module.exports = router;
