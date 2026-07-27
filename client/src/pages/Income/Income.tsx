import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";


export default function AddExpense() {

    const context = useContext(TransactionContext);

    if (!context) return null;

    const incomeTransactions = context.transactions.filter(
        (transaction) =>
            transaction.type === "income"
    );

    const totalIncome = incomeTransactions.reduce(
        (total, transaction) =>
            total + transaction.amount,
        0
    );


    return(
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">
                    Income
                </h1>

                <p className="text-gray-500">
                    Track all your income sources.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold">
                    Total Income
                </h2>

                <p className="text-3xl font-bold text-green-600 mt-2">
                    ZMW {totalIncome}
                </p>
            </div>


            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Income History
                </h2>

                {incomeTransactions.length === 0 ? (

                    <p className="text-gray-500">
                        No income transactions yet.
                    </p>
                ) : (

                    <div className="space-y-4">

                        {incomeTransactions.map((transaction)=> (

                            <div 
                              key={transaction.id}
                              className="flex justify-between border-b pd-3"
                            >

                                <div>

                                    <h3 className="font-semibold">
                                        {transaction.title}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {transaction.category}
                                    </p>

                                </div>

                                <div className="text-green-600 font-bold">

                                    + ZMW {transaction.amount}

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    )

}