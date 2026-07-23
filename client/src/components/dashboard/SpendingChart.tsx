import { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { TransactionContext } from "../../context/TransactionContext";


export default function SpendingChart() {

  const context = useContext(TransactionContext);

  if (!context) return null;

  const { transactions } = context;


  const groupedData = transactions.reduce(
    (acc, transaction) => {

      const category = transaction.category || "Other";


      if (!acc[category]) {
        acc[category] = {
          name: category,
          income: 0,
          expenses: 0,
        };
      }


      if (transaction.type === "income") {
        acc[category].income += transaction.amount;
      }


      if (transaction.type === "expense") {
        acc[category].expenses += transaction.amount;
      }


      return acc;

    },
    {} as Record<
      string,
      {
        name: string;
        income: number;
        expenses: number;
      }
    >
  );


  const data = Object.values(groupedData);


  return (
    <div className="rounded-xl bg-white p-6 shadow-md">

      <h2 className="mb-6 text-xl font-semibold">
        Spending Overview
      </h2>


      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />


            <Bar
              dataKey="income"
              fill="#16a34a"
              name="Income"
            />


            <Bar
              dataKey="expenses"
              fill="#dc2626"
              name="Expenses"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}