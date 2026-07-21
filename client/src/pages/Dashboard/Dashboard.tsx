import SummaryCards from "../../components/dashboard/SummaryCards";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import SpendingChart from "../../components/dashboard/SpendingChart";

export default function Dashboard() {
  return (
     <div className="space-y-8">
        {/*Header*/}
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome to your Personal Finance Manager.
        </p>
      </div>

      <SummaryCards />
      <SpendingChart/>
      <RecentTransactions />
    </div>
  );
}