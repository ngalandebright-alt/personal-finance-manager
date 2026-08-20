import { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { useCurrency } from "../../hooks/useCurrency";

export default function AddIncome() {
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
      type: "income",
      category,
      date,
    });

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 space-y-4"
    >
      <h2 className="text-xl font-bold">
        Add Income
      </h2>

      {/* Income Title */}
      <input
        className="w-full border rounded p-2"
        type="text"
        placeholder="Income Title"
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
            className="w-full p-2 outline-none"
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      {/* Category */}
      <input
        className="w-full border rounded p-2"
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* Date */}
      <input
        className="w-full border rounded p-2"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Submit */}
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Income
      </button>
    </form>
  );
}