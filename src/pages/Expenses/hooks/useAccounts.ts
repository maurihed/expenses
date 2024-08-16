import { AccountService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Account } from "@/types";

export const useAccounts = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Account[]>("accounts", AccountService.getAccounts, {
    staleTime: Infinity, // Disable background fetching
  });

  const { mutate: updateAccountBalance } = useMutation(AccountService.updateAccountBalance, {
    onSuccess: (updatedAccount: Account) => {
      queryClient.setQueryData<Account[]>("accounts", (preAccounts) => preAccounts?.map(
        (prevAccount) => prevAccount.id === updatedAccount.id ? { ...updatedAccount } : prevAccount) ?? []
      );
    }
  })

  return {
    accounts: data || [],
    loadingAccounts: isLoading,
    error,
    updateAccountBalance,
  }
}
