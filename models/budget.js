const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  MonthlyBudget: {
    type: Number,
    required: true,
    min: 0,
  },

  TotalIncome: {
    type: Number,
    required: true,
    min: 0,
  },
  YearlyBudget: {
    type: Number,
    required: true,
    min: 0,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Budget", BudgetSchema);
