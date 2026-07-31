const Transaction = require("../models/Transaction");

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user._id,
        });

        res.json({
            success: true,
            count: transactions.length,
            transactions,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const addTransaction = async (req, res) => {
    try {

        console.log("Logged in user:", req.user);

        const transaction = await Transaction.create({
            ...req.body,
            user: req.user._id,
        });

        console.log("Created transaction:", transaction);

        res.status(201).json({
            success: true,
            transaction,
        });

    } catch (error) {
        console.log("CREATE ERROR:", error);

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const id = req.params.id;

        const transaction = await Transaction.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }
        res.json({
            success: true,
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteTransaction = async (req, res) => {
    try {

        console.log("Delete ID:", req.params.id);

        const transaction = await Transaction.findByIdAndDelete(
            req.params.id
        );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        res.json({
            success: true,
            message: "Transaction deleted successfully",
        });

    } catch (error) {

        console.error("DELETE ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
};