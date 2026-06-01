const express = require("express");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

const {
  getAllExpenses,
  getExpense,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense");

router
  .route("/")
  .get(authMiddleware, getAllExpenses)
  .post(authMiddleware, addExpense);

router
  .route("/:id")
  .patch(authMiddleware, updateExpense)
  .get(authMiddleware, getExpense)
  .delete(authMiddleware, deleteExpense);

module.exports = router;
