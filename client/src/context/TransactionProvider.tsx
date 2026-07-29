import { useState, useEffect, type ReactNode } from "react";
import type { Transaction } from "../types/transaction";
import { TransactionContext } from "./TransactionContext";

import {
    getTransactions,
    addTransaction as addTransactionApi,
    deleteTransaction as deleteTransactionApi,
} from "../api/transactionApi";


export default function TransactionProvider({
    children,
}: {
    children: ReactNode;
}) {


    const [transactions, setTransactions] = useState<Transaction[]>([]);


    useEffect(() => {
        async function loadTransactions() {
            try {
                const response = await getTransactions();

                setTransactions(response.data.transactions);

            } catch (error) {
                console.error("Failed to load transactions:", error);
            } 
         }

         loadTransactions();
    }, []);

      function updateTransaction(updatedTransaction: Transaction) {

  setTransactions((prev) =>
    prev.map((transaction) =>
      transaction.id === updatedTransaction.id
        ? updatedTransaction
        : transaction
    )
  );

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

async function deleteTransaction(id: number) {
    try {
        await deleteTransactionApi(id);

        setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
    );
    } catch (error) {
        console.error("Fialed to delete transaction:", error);
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