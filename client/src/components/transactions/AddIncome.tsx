import { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";

export default function AddIncome() {

    const context = useContext(TransactionContext);

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
            id: Date.now(),
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


            <input
                className="w-full border rounded p-2"
                type="text"
                placeholder="Income Title"
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
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Add Income
            </button>

        </form>
    );
}