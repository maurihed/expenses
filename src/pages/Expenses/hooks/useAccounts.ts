import { useCallback, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import type { Account } from "@/types";

import db, { converter } from "@/firebase";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const accountsCollectionRef = collection(db, "accounts").withConverter(converter<Account>());

  const updateAccountBalance = useCallback(async (accountId: string, adjustedBalance: number) => {
    const accountRef = doc(db, "accounts", accountId);
    const accountSnap = await getDoc(accountRef);
    if (accountSnap.exists()) {
      const newBalance = accountSnap.data().balance + adjustedBalance;
      updateDoc(accountRef, { balance: newBalance });
      setAccounts((prevAccounts) => prevAccounts.map((prevAccount) => prevAccount.id === accountId ? { ...prevAccount, balance: newBalance } : prevAccount));
    }
  }, [setAccounts]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getDocs(accountsCollectionRef);
        setAccounts(data.docs.map((doc) => doc.data()));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return {
    accounts,
    loadingAccounts: loading,
    error,
    updateAccountBalance,
  }
}