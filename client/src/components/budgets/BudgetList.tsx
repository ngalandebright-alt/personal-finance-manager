import { useContext } from "react";
import { BudgetContext } from "../../context/BudgetContext";
import { TransactionContext } from "../../context/TransactionContext";
import  type { Transaction } from "../../types/transaction";

export default function BudgetList() {

  console.log("BudgetList loaded");


  const budgetContext = useContext(BudgetContext);
  const transactionContext = useContext(TransactionContext);


  if (!budgetContext || !transactionContext) return null;


  const { budget, deleteBudget } = budgetContext;
  const {transactions} = transactionContext;


  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-4">
        My Budgets
      </h2>


      {budget.length === 0 ? (

        <p className="text-gray-500">
          No budgets created yet.
        </p>

      ) : (

        <div className="space-y-4">

          {budget.map((item) => {

            const spent = transactions
              .filter(
                (transaction: Transaction) =>
                  transaction.category === item.category &&
                  transaction.type === "expense"
              )
              .reduce(
                (total: number, transaction: Transaction) =>
                  total + transaction.amount,
                0
              );


            const remaining = item.amount - spent;


            const percentage =
              item.amount > 0
                ? (spent / item.amount) * 100
                : 0;


            return (

              <div
                key={item._id}
                className="border-slate-200 rounded-xl p-5 space-y-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex items-center justify-between">

  <div>
    <h3 className="font-semibold text-slate-900">
      {item.category}
    </h3>

    <p className="mt-1 text-xs text-slate-500">
      Monthly budget
    </p>
  </div>

  <span className="text-lg font-bold text-blue-600">
    ZMW {item.amount}
  </span>

</div>


                <div className="flex items-center justify-between text-sm">

                  <p>
                    Spent: ZMW {spent}
                  </p>


                  <p>
                    Remaining: ZMW {remaining}
                  </p>

                  <button
                     onClick={() => deleteBudget(item._id!)}
                     className="bg-red-600 text-white px-3 py-1 rounded transition-all duration-200 hover:bg-red-700 hover:scale-105 active:scale-95"
                    >
                        Delete
                    </button>

                </div>


                <div className="w-full bg-gray-200 rounded-full h-3">

                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                    }}
                  />

                </div>


                {spent > item.amount && (

                  <p className="text-red-600 font-semibold">
                    ⚠ Over Budget by ZMW {spent - item.amount}
                  </p>

                )}

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}