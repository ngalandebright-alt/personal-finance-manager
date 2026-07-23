import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";


export default function TransactionList() {
     
    const context  = useContext(TransactionContext);

    if  (!context) return null;

    const { transactions } = context;

    return (
        <div>
            <h2 className="text-xl font-bold">
                Recent Transactions
            </h2>

            {transactions.length === 0 ? (
                <p className="text-gray-500">
                    No transaction yet
                </p>
            ) : (
                transactions.map((transaction) => (
                    <div
                       key={transaction.id}
                       className="border-b pb-3"
                       >
                        <div className="flex justify-between">

                            <div>

                                <h3 className="font-semibold">
                                    {transaction.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {transaction.category}
                                </p>
                            </div>

                            <div>
                                <p
                                   className={
                                    transaction.type === "income"
                                    ? "text-green-600 font-bold"
                                    : "text-red-600 font-bold"
                                   }
                                >
                                    {transaction.type === "income" ? "+" : "-"}
                                    {transaction.amount} ZMW
                                </p>

                                <p className="text-sm text-gray-500">
                                    {transaction.date}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}