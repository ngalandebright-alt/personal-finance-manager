import {useContext,useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import type { Transaction } from "../types/transaction";
import  EditTransaction from "../components/transactions/EditTransaction";


export default function Transactions() {
    const context = useContext(TransactionContext);

    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState<
    "all" | "income" | "expense">("all");

    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    if (!context) return null;

    const { transactions, deleteTransaction } = context;

    const filteredTransactions = transactions
      .filter((transaction) => {

        const matchesSearch =
          transaction.title
           .toLowerCase()
           .includes(search.toLowerCase()) ||
        transaction.category
           .toLowerCase()
           .includes(search.toLowerCase());

        const matchesType =
           filterType === "all" ||
           transaction.type === filterType;

           return matchesSearch && matchesType;

      });

           return (

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        Transactions
                    </h1>

                    <p className="text-gray-500">
                        Manage all your income and expenses.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow space-y-4">

                    <input
                       className="w-full border rounded p-2"
                       placeholder="Search transactions..."
                       value={search}
                       onChange={(e)=>setSearch(e.target.value)}
                       />

                       <div className="flex gap-3">

                        <button
                           onClick={()=>setFilterType("all")}
                           className="border px-4 py-2 rounded"
                        >
                           All
                        </button>

                        <button
                           onClick={()=>setFilterType("income")}
                           className="border px-4 py-2 rounded"
                        >
                            Income
                        </button>

                        <button
                           onClick={()=>setFilterType("expense")}
                           className="border px-4 py-2 rounded"
                        
                        >
                            Expense
                        </button>

                       </div>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    {filteredTransactions.length === 0 ? (
                        <p className="text-gray-500">
                            No transactions found.
                        </p>
                    ) : (

                        <div className="space-y-4">

                            {filteredTransactions.map((transaction)=> (

                                <div
                                   key={transaction.id}
                                   className="flex justify-between border-b pb-3"
                                >


                                    <div>

                                        <h3 className="font-semibold">
                                            {transaction.title}
                                        </h3>

                                        <p className="text-gray-500 text-sm">
                                            {transaction.category}
                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p
                                          className={
                                            transaction.type === "income"
                                            ? "text-green-600 font-bold"
                                            : "text-red-600 font-bold"
                                          }
                                        >
                                            {transaction.type === "income"
                                            ?"+"
                                            :"-"}

                                            ZMW {transaction.amount}

                                        </p>

                                        <div className="flex gap-2 mt-2">

                                            <button
                                               onClick={() =>
                                                setSelectedTransaction(transaction)
                                               }
                                               className="bg-blue-600 text-white px-3 py-1 rounded"
                                               >
                                                Edit
                                            </button>

                                            <button
                                               onClick={()=>
                                                deleteTransaction(transaction.id)
                                               }
                                               className="bg-red-600 text-white px-3 py-1 rounded"
                                               >
                                               Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                </div>

                {selectedTransaction && (

                    <EditTransaction
                       transaction={selectedTransaction}
                       onClose={() =>
                        setSelectedTransaction(null)
                       }
                    />
                )}

            </div>
           );

}