import AddBudget from "../../components/budgets/AddBudget";
import BudgetList from "../../components/budgets/BudgetList";

export default function Budgets() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">
                Budgets
            </h1>
            <AddBudget/>

            <BudgetList/>
        </div>
    );
}