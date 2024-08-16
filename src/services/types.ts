import { Account, Transaction } from "@/types";

export interface AccountServiceInterface {
  getAccounts(): Promise<Account[]>;
  addAccount(account: Account): Promise<Account>;
  getAccountRefById(id: string): Promise<Account>;
  updateAccountBalance({ accountId, newBalance }: {accountId: string, newBalance: number}): Promise<Account>;
}

export interface TransactionServiceInterface {
  getTransactions(): Promise<Transaction[]>;
  addTransaction(newTransaction: Transaction): Promise<Transaction>;
  editTransaction({ transactionToEdit, transactionEdited }: { transactionToEdit: Transaction, transactionEdited: Transaction }): Promise<Transaction>;
  deleteTransaction(id: string): Promise<string>;
}
