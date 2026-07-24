import { useEffect, useState, type ReactNode } from "react";
import type { Budget } from "../types/budget";
import { BudgetContext } from "./BudgetContext";


export default function BudgetProvider({
    children,

}: {
    children: ReactNode;
}) {

    const [budget, setBudget] = useState<Budget[]>(() => {


        const savedBudgets =
            localStorage.getItem("budgets");
        
        return savedBudgets 
          ? JSON.parse(savedBudgets)
          : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "budgets",
            JSON.stringify(budget)
        );


    }, [budget]);

      
    function addBudget(newBudget: Budget) {

        setBudget((prev) => [
            ...prev,
            newBudget
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