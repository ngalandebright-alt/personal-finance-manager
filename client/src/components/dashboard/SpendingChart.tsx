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
import type { Transaction } from "../../types/transaction";
import { useCurrency } from "../../hooks/useCurrency";
import { formatCurrency } from "../../utils/currency";

type SpendingChartContext = {
  transactions: Transaction[];
};

export default function SpendingChart() {
  const context = useContext(
    TransactionContext
  ) as SpendingChartContext | null;

  const { currency } = useCurrency();

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
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Spending Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Income and expenses by category
        </p>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                formatCurrency(value, currency)
              }
            />

            <Tooltip
              formatter={(value) =>
                formatCurrency(Number(value), currency)
              }
            />

            <Bar
              dataKey="income"
              fill="#16a34a"
              name="Income"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="expenses"
              fill="#dc2626"
              name="Expenses"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}