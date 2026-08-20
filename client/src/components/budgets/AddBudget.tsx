import { useContext, useState } from "react";
import { BudgetContext } from "../../context/BudgetContext";
import { useCurrency } from "../../hooks/useCurrency";

export default function AddBudget() {
  const context = useContext(BudgetContext);

  const { currency } = useCurrency();

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
        {/* Category */}
        <input
          type="text"
          placeholder="Category (e.g. Food)"
          className="w-full border rounded-lg p-3"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Monthly Budget ({currency})
          </label>

          <div className="flex items-center border rounded-lg overflow-hidden">
            <span className="bg-slate-100 px-3 py-3 font-medium text-slate-600">
              {currency}
            </span>

            <input
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full p-3 outline-none"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            />
          </div>
        </div>

        {/* Submit */}
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