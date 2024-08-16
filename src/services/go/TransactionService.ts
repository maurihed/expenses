import { Transaction } from "@/types";

const { VITE_GO_BASE_URL } = import.meta.env;
const TRANSACTION_URL = `${VITE_GO_BASE_URL}/transactions`;

export class TransactionService {
  public static async addTransaction(newTransaction: Transaction): Promise<Transaction> {
    try {
      const response = await fetch(TRANSACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });
      const { id } = await response.json();
      return Promise.resolve({ ...newTransaction, id });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public static async editTransaction({ transactionToEdit, transactionEdited }: { transactionToEdit: Transaction; transactionEdited: Transaction; }): Promise<Transaction> {
    const body = {
      ...transactionToEdit,
      ...transactionEdited
    };

    await fetch(`${TRANSACTION_URL}/${transactionToEdit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    return Promise.resolve(body);
  }
  public static async deleteTransaction(id: string): Promise<string> {
    try {
      await fetch(`${TRANSACTION_URL}/${id}`, {
        method: "DELETE",
      });
      return Promise.resolve(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getTransactions(): Promise<Transaction[]> {
    try {
      const response = await fetch(TRANSACTION_URL);
      const transactions = await response.json();
      return Promise.resolve(transactions?.map((transaction: Transaction) => ({ ...transaction, date: new Date(transaction.date) })) ?? []);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}