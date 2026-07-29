let transactions = [];

const getTransactions = (req, res) => {
    res.json({
        seccess: true,
        count: transactions.length,
        transactions,
    });

};

const addTransaction = (req, res) => {
    const transaction = {
        id: Date.now(),
        ...req.body,
    };

    transactions.push(transaction);

    req.status(201).json({
        success: true,
        transaction,
    });

};

const deleteTransaction = (req, res) => {
    const id = Number(req.params.id);

    transactions = transactions.filter(
        (transaction) => transaction.id !== id
    );

    res.json({
        success: true,
        message: "Transaction deleted successfully",
    });
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction,
};