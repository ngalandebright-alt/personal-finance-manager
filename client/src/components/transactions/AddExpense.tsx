import { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";

export default function AddExpense() {
  const context = useContext(TransactionContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  if (!context) return null;

  const { addTransaction } = context;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    addTransaction({
      id: Date.now(),
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
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 space-y-4"
    >
      <h2 className="text-xl font-bold">
        Add Expense
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full border rounded p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        className="w-full border rounded p-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        className="w-full border rounded p-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="date"
        className="w-full border rounded p-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Add Expense
      </button>
    </form>
  );
}