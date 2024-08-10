import { useCallback, useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, deleteDoc } from "firebase/firestore";
import db, { converter } from "@/firebase";
import type { Transaction } from "@/types";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const transactionsCollectionRef = collection(db, "transactions");

  const newTransaction = useCallback(async (_newTransaction: Transaction) => {
    const { id: addedId } = await addDoc(transactionsCollectionRef, {
      type: _newTransaction.type,
      accountId: _newTransaction.accountId,
      amount: _newTransaction.amount,
      description: _newTransaction.description,
      date: _newTransaction.date,
      category: _newTransaction.category
    });

    const addedTransaction = { ..._newTransaction, id: addedId };
    setTransactions([addedTransaction, ...transactions]);
  }, [setTransactions, transactions, transactionsCollectionRef]);

  const editTransaction = useCallback(async (transactionToEdit: Transaction, transactionEdited: Transaction) => {
    const docRef = doc(db, "transactions", transactionToEdit.id);
    await updateDoc(docRef, {
      type: transactionEdited.type,
      accountId: transactionEdited.accountId,
      amount: transactionEdited.amount,
      description: transactionEdited.description,
      date: transactionEdited.date,
      category: transactionEdited.category
    });

    const editedTransaction = { ...transactionToEdit, ...transactionEdited };
    setTransactions(transactions.map((transaction) => transaction.id === editedTransaction.id ? editedTransaction : transaction));
  }, [transactions, setTransactions]);

  const deleteTransaction = useCallback(async (id: string) => {
    const docRef = doc(db, "transactions", id);
    await deleteDoc(docRef);
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  }, [setTransactions, transactions])

  useEffect(() => {
    (async () => {
      try {
        setLoadingTransactions(true);
        const data = await getDocs(query(transactionsCollectionRef.withConverter(converter<Transaction>()), orderBy("date", "desc")));
        setTransactions(data.docs.map((doc) => doc.data()));
      } catch (error) {
        setError(error);
      } finally {
        setLoadingTransactions(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    transactions,
    loadingTransactions,
    error,
    newTransaction,
    editTransaction,
    deleteTransaction
  }
}