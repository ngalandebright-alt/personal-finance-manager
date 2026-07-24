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



      function updateTransaction(updatedTransaction: Transaction) {

  setTransactions((prev) =>
    prev.map((transaction) =>
      transaction.id === updatedTransaction.id
        ? updatedTransaction
        : transaction
    )
  );

}


function deleteTransaction(id: number) {

  setTransactions((prev) =>
    prev.filter(
      (transaction) => transaction.id !== id
    )
  );

}



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
             updateTransaction,
             deleteTransaction,
           }}
        >
            {children}

        </TransactionContext.Provider>
    );
}