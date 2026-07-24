import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import type { Transaction } from "../../types/transaction";


export default function TransactionList() {

  const context = useContext(TransactionContext);


  if (!context) return null;


  const { transactions, deleteTransaction } = context as unknown as {
    transactions: Transaction[];
    deleteTransaction: (id: string | number) => void;
  };


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

        transactions.map((transaction: Transaction) => (

          <div
            key={transaction.id}
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


                <button
                  onClick={() =>
                    deleteTransaction(transaction.id)
                  }
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>


              </div>


            </div>


          </div>

        ))

      )}

    </div>
  );
}