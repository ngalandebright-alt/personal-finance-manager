const Budget = require("../models/Budget");

const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({
            user: req.user._id,
        });

        res.json({
            success: true,
            count: budgets.length,
            budgets,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const createBudget = async (req, res) => {
    try {

        const { category, amount } = req.body;

        const budget = await Budget.create({
            category,
            amount,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            budget,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteBudget = async (req, res) => {
    try {

        const budget = await Budget.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found",
            });
        }

        await budget.deleteOne();

        res.json({
            success: true,
            message: "Budget deleted",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getBudgets,
    createBudget,
    deleteBudget,
};
 