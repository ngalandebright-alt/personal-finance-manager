import SummaryCards from "../../components/dashboard/SummaryCards";
import RecentTransactions from "../../components/dashboard/RecentTransactions";

export default function Dashboard() {
  return (
     <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome to your Personal Finance Manager.
        </p>
      </div>

      <SummaryCards />
      <RecentTransactions />
    </div>
  );
}