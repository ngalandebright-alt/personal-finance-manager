import { useState, type ReactNode } from "react";
import type { Transaction } from "../types/transaction";
import { TransactionContext } from "./TransactionContext";


export default function TransactionProvider({
    children,
}: {
    children: ReactNode;

}) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    function addTransaction(transaction: Transaction) {
        setTransactions((prev) => [
            ...prev, 
            transaction
        ]);
    }

    return (
        <TransactionContext.Provider
           value={{
            transactions,
            addTransaction,
           }}
        >
            {children}
        </TransactionContext.Provider>
    );
}