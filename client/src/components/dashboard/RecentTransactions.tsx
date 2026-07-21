const transactions = [
    { id: 1, title: "Salary", amount: "+ ZMW 18,000", color: "text-green-600" },
    { id: 2, title: "Groceries", amount: "- ZMW 500", color: "text-red-600" },
    { id: 3, title: "Transport", amount: "- ZMW 120", color: "text-red-600" },
    { id: 4, title: "Electricity", amount: "- ZMW 350", color: "text-red-600" },
];

export default function RecentTrasctions(){
    return(
        <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Recent Transactions</h2>

            <div className="space-y-3">
                {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex item-center justify-between border-b pb-2"
                      >
                        <span>{transaction.title}</span>
                        <span className={transaction.color}>
                            {transaction.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}