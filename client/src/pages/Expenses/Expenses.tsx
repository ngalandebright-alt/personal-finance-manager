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
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Expenses
        </h1>

        <p className="mt-1 text-slate-500">
          Track and manage all your expenses.
        </p>
      </div>

      {/* Add Expense */}
      <AddExpense />

      {/* Total Expenses */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">
          Total Expenses
        </p>

        <p className="mt-2 text-3xl font-bold tracking-tight text-red-600">
          ZMW {totalExpenses}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Across {expenseTransactions.length} expense transaction
          {expenseTransactions.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Expense History */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Expense History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your recorded expense transactions.
          </p>
        </div>

        {expenseTransactions.length === 0 ? (

          <div className="rounded-lg bg-slate-50 p-6 text-center">
            <p className="text-slate-500">
              No expense transactions yet.
            </p>
          </div>

        ) : (

          <div className="space-y-1">

            {expenseTransactions.map((transaction) => (

              <div
                key={transaction._id}
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-slate-100
                  py-4
                  last:border-0
                "
              >

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {transaction.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {transaction.category}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {transaction.date}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-red-600">
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
