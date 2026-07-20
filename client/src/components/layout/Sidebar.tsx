import { NavLink } from "react-router-dom";
import {
    FaChartPie,
    FaMoneyBillWave,
    FaWallet,
    FaBullseye,
    FaUser,
} from "react-icons/fa";

const links = [
    { name: "Dashboard", path: "/", icon: <FaChartPie /> },
    { name: "Income", path: "/income", icon: <FaMoneyBillWave /> },
    { name: "Expenses", path: "/expenses", icon: <FaWallet /> },
    { name: "Budgets", path: "/budgets", icon: <FaBullseye /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-8">FinancePro</h1>

            <nav className="space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }: { isActive: boolean }) =>
                            `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                                isActive ? "bg-blue-600" : "hover:bg-slate-800"
                            }`
                        }
                    >
                      {link.icon}
                      <span>{link.name}</span>
                      </NavLink>
                ))}
            </nav>
        </aside>
    );
}