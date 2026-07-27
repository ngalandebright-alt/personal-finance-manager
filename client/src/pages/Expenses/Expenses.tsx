import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import AddExpense from "../../components/transactions/AddExpense";



export default function Expenses() {
    const context = useContext(TransactionContext);

    if (!context) return null;
    
    const { transactions } = context;

    const expenseTransactions = transactions.filter(
        (transaction) => transaction.type === "expense"
    );

    const totalExpenses = expenseTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Expenses
                </h1>

                <p className="text-gray-500">
                    Track all your expenses.
                </p>

            </div>

            <AddExpense/>

            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold">
                    Total Expenses
                </h2>
                <p className="text-3xl font-bold text-red-600 mt-2">
                    ZMW {totalExpenses}
                </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Expenses History
                </h2>

                {expenseTransactions.length === 0 ?(
                    <p className="text-gray-500">
                        No expense transaction yet.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {expenseTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex justify-between border-b pb-3"
                            >

                                <div>
                                    <h3 className="font-semibold">
                                        {transaction.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {transaction.category}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {transaction.date}
                                    </p>

                                </div>
                                <div className="text-right">
                                    <p className="text-red-600 font-bold">
                                       - ZMW {transaction.amount}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>

        </div>
    );
}
