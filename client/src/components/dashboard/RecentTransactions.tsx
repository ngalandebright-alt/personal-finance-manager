import { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import EditTransaction from "../transactions/EditTransaction";
import type { Transaction } from "../../types/transaction";


export default function RecentTransactions() {

  const formMoney = (amount: number) =>
    new Intl.NumberFormat("en-ZM").format(amount);

  const context = useContext(TransactionContext);


  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);


  if (!context) return null;


  const { transactions, deleteTransaction } = context;


  return (
    <div className="rounded-xl bg-white border border-slate-300 p-6 shadow-sm">

     <div className="mb-5">
  <h2 className="text-xl font-semibold text-slate-900">
    Recent Transactions
  </h2>

  <p className="mt-1 text-sm text-slate-500">
    Your latest income and expenses
  </p>
</div>


      {transactions.length === 0 ? (

        <p className="text-gray-500">
          No transactions yet.
        </p>

      ) : (

        <div className="space-y-4">

          {transactions.map((transaction) => (

            <div
              key={transaction._id}
              className="flex items-center justify-between border-b border-slate-400 pb-4"
            >

              <div>

                <h3 className="font-semibold">
                  {transaction.title}
                </h3>


                <p className="text-sm text-slate-500">
                  {transaction.category}
                </p>


                <p className="text-sm text-slate-500">
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

                  ZMW {formMoney(transaction.amount)}

                </p>


                <div className="flex gap-2 mt-2">


                  <button
                    onClick={() =>
                      setSelectedTransaction(transaction)
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-95"
                  >
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      deleteTransaction(transaction._id!)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded transition-all duration-200 hover:bg-red-700 hover:scale-105 active:scale-95"
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