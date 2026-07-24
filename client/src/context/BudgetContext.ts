import { createContext } from "react";
import type { Budget } from "../types/budget";

interface BudgetContextType {
    budget: Budget[];
    addBudget: (budget: Budget) => void;
    deleteBudget: (id: number) => void;
}

export const BudgetContext = 
   createContext<BudgetContextType | undefined>(undefined);