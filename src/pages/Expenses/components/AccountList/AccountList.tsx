import { useCallback, useState } from "react";
import { Account, Transaction } from "@/types";
import { formatMoney } from "@/utils";
import AccountRow from "./AccountRow";
import { useDisclosure } from "@heroui/react";
import { TransactionFormModal } from "../TransactionFormModal";
import { ExpensesSection } from "../ExpensesSection";
import { useExpensesContext } from "../../contexts";

function AccountList({ accounts, loading }: { accounts: Account[]; loading: boolean }) {
  const [selectedAccount, setSelectedAccount] = useState<Account>();
  const { isOpen, onOpen, onClose } = useDisclosure({ id: "NEW_TRANSACTION" });
  const { newTransaction, updateAccountBalance } = useExpensesContext();

  const total = accounts.reduce((acc, cur) => acc + cur.balance, 0);

  const accountClickHandler = (account: Account) => {
    setSelectedAccount(account);
    onOpen();
  };

  const closeHandler = useCallback(() => {
    setSelectedAccount(undefined);
    onClose();
  }, [onClose]);

  const handleNewTransaction = useCallback(
    (transaction: Transaction) => {
      newTransaction(transaction);
      updateAccountBalance({
        accountId: transaction.accountId,
        newBalance:
          transaction.type === "expense" ? -transaction.amount : transaction.amount,
      });
      closeHandler();
    },
    [closeHandler, newTransaction, updateAccountBalance]
  );

  return (
    <ExpensesSection title="Cuentas" loading={loading}>
      <ul className="flex flex-col gap-4 mb-4">
        {accounts.map((account) => (
          <li key={account.id}>
            <AccountRow account={account} newTransaction={accountClickHandler} />
          </li>
        ))}
      </ul>
      <div className="border-b border-slate-600 -mx-4"></div>
      <div className="flex justify-between p-4">
        <span>Total</span>
        <span>{formatMoney(total)}</span>
      </div>
      {selectedAccount && (
        <TransactionFormModal
          action={handleNewTransaction}
          isOpen={isOpen}
          onClose={closeHandler}
          account={selectedAccount}
        />
      )}
    </ExpensesSection>
  );
}

export default AccountList;
