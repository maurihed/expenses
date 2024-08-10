import { createContext, useContext } from "react";
import { Account, Transaction } from "@/types";

type ExpensesContextType = {
  accounts: Account[],
  newTransaction: (transaction: Transaction) => void
  editTransaction: (transactionToEdit: Transaction, transactionEdited: Transaction) => void
  updateAccountBalance: (accountId: string, newBalance: number) => void
  deleteTransaction: (transactionId: string) => void
}

const expensesContext = createContext<ExpensesContextType>({
  accounts: [],
  newTransaction: () => {},
  editTransaction: () => {},
  updateAccountBalance: () => {},
  deleteTransaction: () => {},
});

export const useExpensesContext = () => useContext(expensesContext);

export const ExpensesProvider = expensesContext.Provider;

