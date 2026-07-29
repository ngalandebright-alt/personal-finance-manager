let transactions = [];

const getTransactions = (req, res) => {
    res.json({
        success: true,
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

    res.status(201).json({
        success: true,
        transaction,
    });

};

const updateTransaction = (req, res) => {
    const id = Number(req.params.id);
    const index  = transactions.findIndex(
    (transaction) => transaction.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Transaction not found",
        });
    }

    transactions[index] = {
        ...transactions[index],
        ...req.body,
    };

    res.json({
        success: true,
        transaction: transactions[index],

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
    updateTransaction,
    deleteTransaction,
};