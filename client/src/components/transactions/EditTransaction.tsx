import { useState, useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import type { Transaction } from "../../types/transaction";

interface EditTransactionProps {
    transaction: Transaction;
    onClose: () => void;
}

export default function EditTransaction({
    transaction,
    onClose,
}: EditTransactionProps) {

    const context = useContext(TransactionContext);
    const [title, setTitle] = useState(transaction.title);
    const [amount, setAmount] = useState(
        transaction.amount.toString()
    );

    const [type, setType] = useState<"income" | "expense">(
        transaction.type
    );
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
            id: transaction.id,
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

            <input 
               className="w-full border rounded p-2"
               value={title}
               onChange={(e)=> setTitle(e.target.value)}
               />

            <input
               className="w-full border rounded p-2"
               type="number"
               value={amount}
               onChange={(e)=>setAmount(e.target.value)}
               />

               <select
                  className="w-full border rounded p-2"
                  value={type}
                  onChange={(e)=>
                    setType(
                        e.target.value as "income" | "expense"
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
               <input
                  className="w-full border rounded p-2"
                  value={category}
                  onChange={(e)=>setCategory(e.target.value)}
                />

                <input
                   className="w-full border rounded p-2"
                   type="date"
                   value={date}
                   onChange={(e)=>setDate(e.target.value)}
                />

                <div className="flex gap-3">

                    <button
                       className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>

                    <button
                       type="button"
                       onClick={onClose}
                       className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                       Cancel
                    </button>

                </div>

        </form>
    );
}