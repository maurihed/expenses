import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { Transaction } from "@/types";
import { formatDate, formatMoney, formatTransactionDate } from "@/utils";
import { TransactionFormModal } from "../TransactionFormModal";
import { ExpensesSection } from "../ExpensesSection";
import TransactionRow from "./TransactionRow";
import { useExpensesContext } from "../../contexts";

function TransactionList({
  transactions,
  loading,
}: {
  transactions: Transaction[];
  loading: boolean;
}) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();
  const { isOpen, onOpen, onClose } = useDisclosure({
    id: "EDIT_TRANSACTION",
  });
  const { editTransaction, updateAccountBalance } = useExpensesContext();

  const transformedTransactions: { [key: string]: Transaction[] } = {};
  transactions.forEach((transaction) => {
    const date = formatDate(transaction.date);
    if (!transformedTransactions[date]) {
      transformedTransactions[date] = [];
    }
    transformedTransactions[date].push(transaction);
  });

  const editTransactionHandler = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  const onCloseHandler = () => {
    setSelectedTransaction(undefined);
    onClose();
  };

  const editTransactionWrapper = (
    transactionToEdit: Transaction,
    transactionEdited: Transaction
  ) => {
    editTransaction({ transactionToEdit, transactionEdited });
    const isSameAccount = transactionToEdit.accountId === transactionEdited.accountId;
    // If the modification does not affect the account balance, do not update the account balance
    if (
      isSameAccount &&
      transactionToEdit.amount === transactionEdited.amount &&
      transactionToEdit.type === transactionEdited.type
    ) {
      onCloseHandler();
      return;
    }

    if (isSameAccount) {
      const adjustment =
        (transactionToEdit.type === "expense"
          ? transactionToEdit.amount
          : -transactionToEdit.amount) +
        (transactionEdited.type === "expense"
          ? -transactionEdited.amount
          : transactionEdited.amount);
      updateAccountBalance({
        accountId: transactionEdited.accountId,
        newBalance: adjustment,
      });
    } else {
      updateAccountBalance({
        accountId: transactionToEdit.accountId,
        newBalance:
          transactionEdited.type === "expense"
            ? transactionToEdit.amount
            : -transactionToEdit.amount,
      });
      updateAccountBalance({
        accountId: transactionEdited.accountId,
        newBalance:
          transactionEdited.type === "expense"
            ? -transactionEdited.amount
            : transactionEdited.amount,
      });
    }
    onCloseHandler();
  };

  const getTotalExpenses = (transactions: Transaction[]) => {
    const total = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    return formatMoney(total);
  };

  return (
    <ExpensesSection title="Transacciones" loading={loading}>
      {!loading && transactions.length === 0 && <p>No hay transacciones</p>}
      <div className="flex flex-col gap-4">
        {Object.entries(transformedTransactions).map(([_date, _transactions]) => (
          <div key={_date}>
            <h3 className="text-left mb-4">
              {formatTransactionDate(_date)}
              <span className="text-slate-300 text-sm ml-2">
                {getTotalExpenses(_transactions)}
              </span>
            </h3>
            <ul className="flex flex-col gap-4">
              {_transactions.map((transaction) => (
                <li key={transaction.id}>
                  <TransactionRow
                    transaction={transaction}
                    onClick={editTransactionHandler}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
        {selectedTransaction && (
          <TransactionFormModal
            isOpen={isOpen}
            onClose={onCloseHandler}
            transaction={selectedTransaction}
            action={editTransactionWrapper}
          />
        )}
      </div>
    </ExpensesSection>
  );
}

export default TransactionList;
