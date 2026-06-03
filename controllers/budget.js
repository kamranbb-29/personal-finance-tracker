const { stripTypeScriptTypes } = require("node:module");
const Budget = require("../models/budget");

const getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      createdBy: req.user.userID,
    });

    res.status(200).json({ budget });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updateBudget = async (req, res) => {
  try {
    const { MonthlyBudget, TotalIncome, YearlyBudget } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { createdBy: req.user.userID },
      {
        ...req.body,
      },
      {
        new: true,
        upsert: true,
      },
    );
    res.status(201).json({ budget });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getBudget, updateBudget };
