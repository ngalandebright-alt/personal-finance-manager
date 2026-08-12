import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import AddIncome from "../../components/transactions/AddIncome";

export default function AddExpense() {
  const context = useContext(TransactionContext);

  if (!context) return null;

  const incomeTransactions = context.transactions.filter(
    (transaction) => transaction.type === "income"
  );

  const totalIncome = incomeTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Income
        </h1>

        <p className="mt-1 text-slate-500">
          Track and manage all your income sources.
        </p>
      </div>

      {/* Add Income */}
      <AddIncome />

      {/* Total Income */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">
          Total Income
        </p>

        <p className="mt-2 text-3xl font-bold tracking-tight text-green-600">
          ZMW {totalIncome}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Across {incomeTransactions.length} income transaction
          {incomeTransactions.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Income History */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Income History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your recorded income transactions.
          </p>
        </div>

        {incomeTransactions.length === 0 ? (

          <div className="rounded-lg bg-slate-50 p-6 text-center">
            <p className="text-slate-500">
              No income transactions yet.
            </p>
          </div>

        ) : (

          <div className="space-y-1">

            {incomeTransactions.map((transaction) => (

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
                </div>

                <div className="text-right">
                  <p className="font-bold text-green-600">
                    + ZMW {transaction.amount}
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