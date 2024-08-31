import db, { converter } from "@/firebase";
import { Transaction } from "@/types";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";

export class TransactionService {
  public static async getTransactions(searchParams: URLSearchParams): Promise<Transaction[]> {
    console.log(searchParams);
    try {
      const data = await getDocs(query(collection(db, "transactions").withConverter(converter<Transaction>()), orderBy("date", "desc")));
      return Promise.resolve(data.docs.map((doc) => doc.data()));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async addTransaction(newTransaction: Transaction): Promise<Transaction> {
    try {
      const { id: addedId } = await addDoc(collection(db, "transactions"), {
        type: newTransaction.type,
        accountId: newTransaction.accountId,
        amount: newTransaction.amount,
        description: newTransaction.description,
        date: newTransaction.date,
        category: newTransaction.category
      });
      return Promise.resolve({ ...newTransaction, id: addedId });
    } catch (error) {
      return Promise.reject(error);   
    }
  }

  public static async editTransaction({ transactionToEdit, transactionEdited }: { transactionToEdit: Transaction, transactionEdited: Transaction }) {
    try {
      const docRef = doc(db, "transactions", transactionToEdit.id);
      await updateDoc(docRef, {
        type: transactionEdited.type,
        accountId: transactionEdited.accountId,
        amount: transactionEdited.amount,
        description: transactionEdited.description,
        date: transactionEdited.date,
        category: transactionEdited.category
      });

      return Promise.resolve({ ...transactionToEdit, ...transactionEdited });   
    } catch (error) {
      return Promise.reject(error);   
    }
}

  public static async deleteTransaction(id: string) {
    try {
      const docRef = doc(db, "transactions", id);
      await deleteDoc(docRef);
      return Promise.resolve(id);
      } catch (error) {
      return Promise.reject(error);
    }
  }
}
