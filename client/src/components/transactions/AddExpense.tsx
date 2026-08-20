import { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { useCurrency } from "../../hooks/useCurrency";

export default function AddExpense() {
  const context = useContext(TransactionContext);

  const { currency } = useCurrency();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  if (!context) return null;

  const { addTransaction } = context;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !amount || !category || !date) {
      alert("Please fill in all fields.");
      return;
    }

    addTransaction({
      title,
      amount: Number(amount),
      type: "expense",
      category,
      date,
    });

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  }

  return (
    <form className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-bold">
        Add Expense
      </h2>

      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        className="w-full border rounded p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Amount ({currency})
        </label>

        <div className="flex items-center border rounded overflow-hidden">
          <span className="bg-slate-100 px-3 py-2 font-medium text-slate-600">
            {currency}
          </span>

          <input
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full p-2 outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      {/* Category */}
      <input
        type="text"
        placeholder="Category"
        className="w-full border rounded p-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* Date */}
      <input
        type="date"
        className="w-full border rounded p-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Submit */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Add Expense
      </button>
    </form>
  );
}