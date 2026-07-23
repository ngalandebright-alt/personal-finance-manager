import AddTransaction from "../../components/transactions/AddTransaction";
import TransactionList from "../../components/transactions/TransactionList";


export default function Expenses() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">
                Expenses
            </h1>
            <AddTransaction/>
            <TransactionList/>
        </div>
    );
}