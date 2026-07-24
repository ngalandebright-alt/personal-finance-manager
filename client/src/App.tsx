import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Income from "./pages/Income/Income";
import Expenses from "./pages/Expenses/Expenses";
import Budgets from "./pages/Budgets/Budgets";
import Profile from "./pages/Profile/Profile";
import Transactions from "./pages/Transactions";


export default function App() {
  return(
    <BrowserRouter>
       <Routes>
        <Route element={<DashboardLayout/>}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/income" element={<Income />}/>
        <Route path="/expenses" element={<Expenses/>}/>
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transactions" element={<Transactions/>}/>
        

        </Route>
       </Routes>
    </BrowserRouter>
  );
}

