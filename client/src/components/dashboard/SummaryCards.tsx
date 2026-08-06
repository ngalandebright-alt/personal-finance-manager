import { useContext } from "react";
import SummaryCard from "./SummaryCard";
import { TransactionContext } from "../../context/TransactionContext";
import type { Transaction } from "../../types/transaction";



export default function SummaryCards() {
   const context = useContext(TransactionContext);
   if (!context) return null;
   const { transactions } = context

   const totalIncome = transactions
      .filter((transaction: Transaction) => transaction.type === "income")
      .reduce((total: number, transaction: Transaction) => total + transaction.amount, 0);

   const totalExpenses = transactions
      .filter((transaction: Transaction) => transaction.type === "expense")
      .reduce((total: number, transaction: Transaction) => total + transaction.amount, 0);

   const balance = totalIncome - totalExpenses;

   const formatMoney = (amount: number) =>
    new Intl.NumberFormat("en-ZM").format(amount);

   return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
         <SummaryCard title="Total Balance" amount={`ZMW ${formatMoney(balance)}`} color="text-blue-600" />

         <SummaryCard title="Income" amount={`ZMW ${formatMoney(totalIncome)}`} color="text-green-600" />

         <SummaryCard title="Expenses" amount={`ZMW ${formatMoney(totalExpenses)}`} color="text-red-600" />

         <SummaryCard title="Savings" amount={`ZMW ${formatMoney(balance)}`} color="text-green-600" />
      </div>
   );
}