import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TransactionService } from "@/services";
import type { Transaction, MonthYearType } from "@/types";
import { useMemo } from 'react';

export const useTransactions = ({ month, year }: MonthYearType) => {
  const getTransactions = useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("month", month.toString());
    searchParams.set("year", year.toString());
    return async () =>  await TransactionService.getTransactions(searchParams);
  }, [month, year]);

  const queryClient = useQueryClient();
  const { data: transactions, isLoading, error } = useQuery(["transactions", month, year], getTransactions,
  {
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