import type { Transaction } from "@/types";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TransactionService } from "@/services";

export const useTransactions = () => {
  const queryClient = useQueryClient();
  const { data: transactions, isLoading, error } = useQuery("transactions", TransactionService.getTransactions, {
    staleTime: Infinity,
  });

  const { mutate: newTransaction } = useMutation(TransactionService.addTransaction, {
    onSuccess: (addedTransaction: Transaction) => {
      queryClient.setQueryData<Transaction[]>("transactions", (prevTransactions) => [addedTransaction, ...(prevTransactions ?? [])]);
    }
  })

  const { mutate: editTransaction } = useMutation(TransactionService.editTransaction, {
    onSuccess: (editedTransaction: Transaction) => {
      queryClient.setQueryData<Transaction[]>("transactions", (prevTransactions) => prevTransactions?.map(
        (prevTransaction) => prevTransaction.id === editedTransaction.id ? { ...editedTransaction } : prevTransaction) ?? []
      );
    }
  });

  const { mutate: deleteTransaction } = useMutation(TransactionService.deleteTransaction, {
    onSuccess: (id) => {
      queryClient.setQueryData<Transaction[]>("transactions", (prevTransactions) => prevTransactions?.filter((transaction) => transaction.id !== id) ?? []);
    }
  })

  return {
    transactions: transactions || [],
    loadingTransactions: isLoading,
    error,
    newTransaction,
    editTransaction,
    deleteTransaction
  }
}