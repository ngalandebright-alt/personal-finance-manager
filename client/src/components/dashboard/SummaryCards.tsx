import { useContext } from "react";
import SummaryCard from "./SummaryCard";
import { TransactionContext } from "../../context/TransactionContext";
import type { Transaction } from "../../types/transaction";
import { useCurrency } from "../../hooks/useCurrency";
import { formatCurrency } from "../../utils/currency";

export default function SummaryCards() {
  const context = useContext(TransactionContext);

  const { currency } = useCurrency();

  if (!context) {
    return null;
  }

  const { transactions } = context;

  const totalIncome = transactions
    .filter(
      (transaction: Transaction) =>
        transaction.type === "income"
    )
    .reduce(
      (total: number, transaction: Transaction) =>
        total + transaction.amount,
      0
    );

  const totalExpenses = transactions
    .filter(
      (transaction: Transaction) =>
        transaction.type === "expense"
    )
    .reduce(
      (total: number, transaction: Transaction) =>
        total + transaction.amount,
      0
    );

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      <SummaryCard
        title="Total Balance"
        amount={formatCurrency(balance, currency)}
        color="text-blue-600"
      />

      <SummaryCard
        title="Income"
        amount={formatCurrency(totalIncome, currency)}
        color="text-green-600"
      />

      <SummaryCard
        title="Expenses"
        amount={formatCurrency(totalExpenses, currency)}
        color="text-red-600"
      />

      <SummaryCard
        title="Savings"
        amount={formatCurrency(balance, currency)}
        color="text-green-600"
      />

    </div>
  );
}