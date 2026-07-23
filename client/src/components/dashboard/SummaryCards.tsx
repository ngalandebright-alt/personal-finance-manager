import { useContext } from "react";
import SummaryCard from "./SummaryCard";
import { TransactionContext } from "../../context/TransactionContext";


export default function SummaryCards() {
    const context = useContext(TransactionContext);
    if (!context) return null;
    const { transactions } = context;

    const totalIncome = transactions
       .filter((transaction) => transaction.type === "income")
       .reduce(
        (total, transaction) => total + transaction.amount,
        0
       );

       const totalExpenses = transactions
         .filter((transaction) => transaction.type === "expense")
         .reduce(
            (total, transaction) => total + transaction.amount,
            0
         );

         const balance = totalIncome - totalExpenses;

         return(
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <SummaryCard
                   title="Total Balance"
                   amount={`ZMW ${balance}`}
                   color="text-blue-600"
                   />

                <SummaryCard
                   title="Income"
                   amount={`ZMW ${totalIncome}`}
                   color="text-green-600"
                   />

                   <SummaryCard
                      title="Expenses"
                      amount={`ZMW ${totalExpenses}`}
                      color="text-red-600"
                      />

                <SummaryCard
                   title="Savings"
                   amount={`ZMW ${balance}`}
                   color="text-red-600"
                   />

            </div>
         );
}