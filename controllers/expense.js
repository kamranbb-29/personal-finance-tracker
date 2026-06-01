const Expense = require("../models/expense");

const getAllExpenses = async (req, res) => {
  try {
    const expense = await Expense.find({
      createdBy: req.user.userID,
    });

    res.status(200).json({ expense });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      createdBy: req.user.userID,
    });
    res.status(201).json({ expense });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getExpense = async (req, res) => {
  try {
    const { id: ExpenseId } = req.params;

    const expense = await Expense.findOne({
      _id: ExpenseId,
      createdBy: req.user.userID,
    });
    if (!expense) {
      return res.status(404).json({ msg: "Expense not Found" });
    }
    return res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id: ExpenseId } = req.params;

    const expense = await Expense.findOneAndUpdate(
      { _id: ExpenseId, createdBy: req.user.userID },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!expense) {
      return res.status(404).json({ msg: "expense does not exist" });
    }
    return res.status(201).json({ expense });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const deleteExpense = async (req, res) => {
  try {
    const { id: ExpenseId } = req.params;

    const expense = await Expense.findOneAndDelete({
      _id: ExpenseId,
      createdBy: req.user.userID,
    });
    if (!expense) {
      return res.status(404).json({ msg: "expense does not exist" });
    }
    return res.status(201).json({ expense });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getAllExpenses,
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
};
