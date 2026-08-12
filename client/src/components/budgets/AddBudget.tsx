import { useContext, useState } from "react";
import { BudgetContext } from "../../context/BudgetContext";

export default function AddBudget() {

    const context = useContext(BudgetContext);

    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");

    if (!context) return null;

    const { addBudget } = context;


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!category || !amount) {
            alert("Please fill in all fields.");
            return;
        }

        await addBudget({
            category,
            amount: Number(amount),
        });

        setCategory("");
        setAmount("");

        alert("Budget added successfully!");
    }


    return (
        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-4">
                Create Budget
            </h2>

            <form 
              onSubmit={handleSubmit}
              className="space-y-4"
            >

                <input
                    type="text"
                    placeholder="Category (e.g. Food)"
                    className="w-full border rounded-lg p-3"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                />


                <input
                    type="number"
                    placeholder="Monthly Budget (ZMW)"
                    className="w-full border rounded-lg p-3"
                    value={amount}
                    onChange={(e) =>
                        setAmount(e.target.value)
                    }
                />


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded-lg py-3 transition-all duration-200 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.98]"
                >
                    Add Budget
                </button>

            </form>

        </div>
    );
}