import { useContext } from "react";
import { BudgetContext } from "../../context/BudgetContext";
import { TransactionContext } from "../../context/TransactionContext";

export default function BudgetList() {

  console.log("BudgetList loaded");


  const budgetContext = useContext(BudgetContext);
  const transactionContext = useContext(TransactionContext);


  if (!budgetContext || !transactionContext) return null;


  const { budget } = budgetContext;
  const { transactions } = transactionContext;


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
                (transaction) =>
                  transaction.category === item.category &&
                  transaction.type === "expense"
              )
              .reduce(
                (total, transaction) =>
                  total + transaction.amount,
                0
              );


            const remaining = item.limit - spent;


            const percentage =
              item.limit > 0
                ? (spent / item.limit) * 100
                : 0;


            return (

              <div
                key={item.id}
                className="border rounded-lg p-4 space-y-3"
              >

                <div className="flex justify-between">

                  <h3 className="font-semibold">
                    {item.category}
                  </h3>


                  <span className="font-bold text-blue-600">
                    ZMW {item.limit}
                  </span>

                </div>


                <div className="text-sm">

                  <p>
                    Spent: ZMW {spent}
                  </p>


                  <p>
                    Remaining: ZMW {remaining}
                  </p>

                </div>


                <div className="w-full bg-gray-200 rounded-full h-3">

                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                    }}
                  />

                </div>


                {spent > item.limit && (

                  <p className="text-red-600 font-semibold">
                    ⚠ Over Budget by ZMW {spent - item.limit}
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