import { useState, useEffect,useContext, type ReactNode, } from "react";
import type { Transaction } from "../types/transaction";
import { TransactionContext } from "./TransactionContext";
import { AuthContext } from "./AuthContext";

import {
    getTransactions,
    addTransaction as addTransactionApi,
    deleteTransaction as deleteTransactionApi,
    updateTransaction as updateTransactionApi,
} from "../api/transactionApi";


export default function TransactionProvider({
    children,
}: {
    children: ReactNode;
}) {


    const auth = useContext(AuthContext);
    const [transactions, setTransactions] = useState<Transaction[]>([]);


useEffect(() => {
    if (!auth?.token) {
        return;
    }

    async function loadTransactions() {
        try {
            const response = await getTransactions();
            setTransactions(response.data.transactions);
        } catch (error) {
            console.error("Failed to load transactions:", error);
        }
    }

    loadTransactions();
}, [auth?.token]);

async function updateTransaction(updatedTransaction: Transaction) {
    try {
        const response = await updateTransactionApi(
            updatedTransaction._id!,
            updatedTransaction
        );

        setTransactions((prev) =>
            prev.map((transaction) =>
                transaction._id === updatedTransaction._id
                    ? response.data.transaction
                    : transaction
            )
        );
    } catch (error) {
        console.error(
            "Failed to update transaction:",
            error
        );
    }
}


async function addTransaction(transaction: Transaction) {

    try{
        const response = await addTransactionApi(transaction);

        setTransactions((prev) => [
            ...prev,
            response.data.transaction,
        ]);

    } catch (error) {

        console.error(
            "Failed to add transaction:",
            error
        );
    }
}

async function deleteTransaction(id: string) {
    console.log("Provider DELETE ID:", id);

    try {
        await deleteTransactionApi(id);

        setTransactions((prev) =>
            prev.filter(
                (transaction) => transaction._id !== id
            )
        );

    } catch (error) {
        console.error(
            "Failed to delete transaction:",
            error
        );
    }
}

    return(
        <TransactionContext.Provider
           value={{
             transactions,
             addTransaction,
             updateTransaction,
             deleteTransaction,
           }}
        >
            {children}

        </TransactionContext.Provider>
    );
}