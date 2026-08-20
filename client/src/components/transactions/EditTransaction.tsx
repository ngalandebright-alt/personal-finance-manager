import { useState, useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import type { Transaction } from "../../types/transaction";
import { useCurrency } from "../../hooks/useCurrency";

interface EditTransactionProps {
  transaction: Transaction;
  onClose: () => void;
}

export default function EditTransaction({
  transaction,
  onClose,
}: EditTransactionProps) {
  const context = useContext(TransactionContext);

  const { currency } = useCurrency();

  const [title, setTitle] = useState(transaction.title);

  const [amount, setAmount] = useState(
    transaction.amount.toString()
  );

  const [type, setType] = useState<
    "income" | "expense"
  >(transaction.type);

  const [category, setCategory] = useState(
    transaction.category
  );

  const [date, setDate] = useState(
    transaction.date
  );

  if (!context) return null;

  const { updateTransaction } = context;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const updatedTransaction: Transaction = {
      _id: transaction._id,
      title,
      amount: Number(amount),
      type,
      category,
      date,
    };

    updateTransaction(updatedTransaction);

    onClose();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-bold">
        Edit Transaction
      </h2>

      {/* Title */}
      <input
        className="w-full border rounded p-2"
        placeholder="Transaction title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
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
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />
        </div>
      </div>

      {/* Type */}
      <select
        className="w-full border rounded p-2"
        value={type}
        onChange={(e) =>
          setType(
            e.target.value as
              | "income"
              | "expense"
          )
        }
      >
        <option value="expense">
          Expense
        </option>

        <option value="income">
          Income
        </option>
      </select>

      {/* Category */}
      <input
        className="w-full border rounded p-2"
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      />

      {/* Date */}
      <input
        className="w-full border rounded p-2"
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
