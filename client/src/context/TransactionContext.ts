import { createContext } from "react";
import type { Transaction } from "../types/transaction";

interface TransactionContextType {
  transactions: Transaction[];

  addTransaction: (transaction: Transaction) => void;

  updateTransaction: (transaction: Transaction) => void;

  deleteTransaction: (id: number) => void;
}

export const TransactionContext =
  createContext<TransactionContextType | undefined>(undefined);