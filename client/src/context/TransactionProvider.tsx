import { useState, useEffect, type ReactNode } from "react";
import type { Transaction } from "../types/transaction";
import { TransactionContext } from "./TransactionContext";


export default function TransactionProvider({
    children,
}: {
    children: ReactNode;
}) {


    const [transactions, setTransactions] = useState<Transaction[]>(() => {

        const savedTransactions =
        localStorage.getItem("transactions");


        return savedTransactions
         ?JSON.parse(savedTransactions)
         :[];
    });


    useEffect(() => {
        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );


    }, [transactions]);

    function addTransaction(transaction: Transaction) {

        setTransactions((prev) => [
            ...prev,
            transaction
        ]);
    }


    return(
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