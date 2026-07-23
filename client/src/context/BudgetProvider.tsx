import { useState, type ReactNode } from "react";
import type { Budget } from "../types/budget";
import { BudgetContext } from "./BudgetContext";

export default function BudgetProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [budget, setBudget] = useState<Budget[]>([]);

    function addBudget(budget: Budget) {
        setBudget((prev)=> [
            ...prev,
            budget
        ]);
    }

    return (
        <BudgetContext.Provider
           value={{
             budget,
             addBudget,
           }}
        >
            {children}
        </BudgetContext.Provider>
    );
}