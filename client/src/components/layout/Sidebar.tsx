import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaMoneyBillWave,
  FaWallet,
  FaBullseye,
  FaUser,
  FaExchangeAlt,
} from "react-icons/fa";

const links = [
  { name: "Dashboard", path: "/", icon: <FaChartPie /> },
  { name: "Income", path: "/income", icon: <FaMoneyBillWave /> },
  { name: "Expenses", path: "/expenses", icon: <FaWallet /> },
  { name: "Budgets", path: "/budgets", icon: <FaBullseye /> },
  { name: "Profile", path: "/profile", icon: <FaUser /> },
  { name: "Transactions", path: "/transactions", icon: <FaExchangeAlt /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-8">
        FinancePro
      </h1>

      <nav className="space-y-2">

        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3
              transition-all duration-200
              hover:translate-x-1
              ${
                isActive
                  ? "bg-blue-600 shadow-md"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <span className="text-lg">
              {link.icon}
            </span>

            <span>{link.name}</span>
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}