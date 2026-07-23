import { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";

export default function AddTransaction() {

  const context = useContext(TransactionContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");


  if (!context) return null;

  const { addTransaction } = context;


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();


    const newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category,
      date,
    };


    addTransaction(newTransaction);


    
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
    setType("expense");
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >

      <input
        className="w-full border rounded p-2"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />


      <input
        className="w-full border rounded p-2"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />


      <select
        className="w-full border rounded p-2"
        value={type}
        onChange={(e) =>
          setType(e.target.value as "income" | "expense")
        }
      >
        <option value="expense">
          Expense
        </option>

        <option value="income">
          Income
        </option>
      </select>


      <input
        className="w-full border rounded p-2"
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />


      <input
        className="w-full border rounded p-2"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />


      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Transaction
      </button>

    </form>
  );
}