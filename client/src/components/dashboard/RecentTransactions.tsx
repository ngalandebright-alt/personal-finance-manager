import { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import EditTransaction from "../transactions/EditTransaction";
import type { Transaction } from "../../types/transaction";


export default function RecentTransactions() {

  const context = useContext(TransactionContext);


  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);


  if (!context) return null;


  const { transactions, deleteTransaction } = context;


  return (
    <div className="rounded-xl bg-white p-6 shadow-md">

      <h2 className="mb-4 text-xl font-semibold">
        Recent Transactions
      </h2>


      {transactions.length === 0 ? (

        <p className="text-gray-500">
          No transactions yet.
        </p>

      ) : (

        <div className="space-y-4">

          {transactions.map((transaction) => (

            <div
              key={transaction.id}
              className="flex items-center justify-between border-b pb-3"
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

                <p
                  className={
                    transaction.type === "income"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >

                  {transaction.type === "income"
                    ? "+"
                    : "-"}

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
                    onClick={() =>
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


      {selectedTransaction && (

        <div className="mt-6">

          <EditTransaction
            transaction={selectedTransaction}
            onClose={() =>
              setSelectedTransaction(null)
            }
          />

        </div>

      )}


    </div>
  );
}