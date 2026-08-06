import {
    useState,
    useEffect,
    useContext,
    type ReactNode,
} from "react";

import type { Budget } from "../types/budget";
import { BudgetContext } from "./BudgetContext";
import { AuthContext } from "./AuthContext";

import {
    getBudgets,
    addBudget as addBudgetApi,
    deleteBudget as deleteBudgetApi,
} from "../api/budgetApi";

export default function BudgetProvider({
    children,
}: {
    children: ReactNode;
}) {

    const auth = useContext(AuthContext);

    const [budget, setBudget] = useState<Budget[]>([]);

    useEffect(() => {

        if (!auth?.token) return;

        async function loadBudgets() {
            try {

                const response = await getBudgets();

                setBudget(response.data.budgets);

            } catch (error) {
                console.error(
                    "Failed to load budgets:",
                    error
                );
            }
        }

        loadBudgets();

    }, [auth?.token]);

    async function addBudget(newBudget: Budget) {

        try {

            const response =
                await addBudgetApi(newBudget);

            setBudget((prev) => [
                ...prev,
                response.data.budget,
            ]);

        } catch (error) {
            console.error(
                "Failed to add budget:",
                error
            );
        }
    }

    async function deleteBudget(id: string) {

        try {

            await deleteBudgetApi(id);

            setBudget((prev) =>
                prev.filter(
                    (budget) => budget._id !== id
                )
            );

        } catch (error) {
            console.error(
                "Failed to delete budget:",
                error
            );
        }
    }

    return (
        <BudgetContext.Provider
            value={{
                budget,
                addBudget,
                deleteBudget,
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
}