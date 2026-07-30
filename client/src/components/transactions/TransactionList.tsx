import { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import type { Transaction } from "../../types/transaction";


export default function TransactionList() {

  const context = useContext(TransactionContext);

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);


  if (!context) return null;


  const {
    transactions,
    deleteTransaction,
    updateTransaction,
  } = context;


function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    console.log("SAVE CLICKED");
    console.log("Editing transaction:", editingTransaction);

    if (!editingTransaction) {
        console.log("No transaction selected");
        return;
    }

    updateTransaction(editingTransaction);

    setEditingTransaction(null);
}

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold">
        Recent Transactions
      </h2>


      {editingTransaction && (

        <form
          onSubmit={handleUpdate}
          className="bg-white shadow rounded-lg p-5 space-y-3"
        >

          <h3 className="font-bold text-lg">
            Edit Transaction
          </h3>


          <input
            className="w-full border rounded p-2"
            value={editingTransaction.title}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                title: e.target.value,
              })
            }
          />


          <input
            className="w-full border rounded p-2"
            type="number"
            value={editingTransaction.amount}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                amount: Number(e.target.value),
              })
            }
          />


          <input
            className="w-full border rounded p-2"
            value={editingTransaction.category}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                category: e.target.value,
              })
            }
          />


          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>

        </form>

      )}


      {transactions.length === 0 ? (

        <p className="text-gray-500">
          No transaction yet
        </p>

      ) : (

        transactions.map((transaction: Transaction) => (

          <div
            key={transaction._id}
            className="border-b pb-3"
          >

            <div className="flex justify-between items-center">


              <div>

                <h3 className="font-semibold">
                  {transaction.title}
                </h3>


                <p className="text-sm text-gray-500">
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

                  {transaction.type === "income" ? "+" : "-"}
                  {transaction.amount} ZMW

                </p>


                <p className="text-sm text-gray-500">
                  {transaction.date}
                </p>


                <div className="flex gap-2 mt-2">

                  <button
                    onClick={() => { 
                      console.log("EDIT BUTTON CLICKED", transaction);
                      setEditingTransaction(transaction);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                   <button
  onClick={() => {
    console.log("CLICKED TRANSACTION:", transaction);
    console.log("CLICKED ID:", transaction._id);

    deleteTransaction(transaction._id!);
  }}
  className="bg-red-600 text-white px-3 py-1 rounded"
>
  Delete
</button>

                </div>


              </div>


            </div>


          </div>

        ))

      )}

    </div>
  );
}