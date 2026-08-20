import SummaryCards from "../../components/dashboard/SummaryCards";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import SpendingChart from "../../components/dashboard/SpendingChart";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Welcome back! Here's an overview of your finances.
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Spending Chart */}
      <SpendingChart />

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
}