import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 p-6 md:p-8">
            <Outlet />
          </main>

        </div>

      </div>

    </div>
  );
}