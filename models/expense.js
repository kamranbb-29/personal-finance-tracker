const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: "Date cannot be in the future",
    },
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Expense", ExpenseSchema);
