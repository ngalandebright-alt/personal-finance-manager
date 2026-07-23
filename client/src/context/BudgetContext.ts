import { createContext } from "react";
import type { Budget } from "../types/budget";

interface BudgetContextType {
    budget: Budget[];
    addBudget: (budget: Budget) => void;
}

export const BudgetContext = 
   createContext<BudgetContextType | undefined>(undefined);