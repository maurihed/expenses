import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { Transaction } from "@/types";
import { formatDate, formatTransactionDate } from "@/utils";
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

    const transformedTransactions: { [key: string]: Transaction[]; } = {};
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

    const editTransactionWrapper = (transactionToEdit: Transaction, transactionEdited: Transaction) => {
      editTransaction(transactionToEdit, transactionEdited);
      const isSameAccount = transactionToEdit.accountId === transactionEdited.accountId;
      if (isSameAccount && transactionToEdit.amount === transactionEdited.amount) {
        onCloseHandler();
        return;
      }  

      if (transactionToEdit.accountId === transactionEdited.accountId) {
        const adjustment = (transactionToEdit.type === 'expense' ? transactionToEdit.amount : -transactionToEdit.amount) +
        (transactionEdited.type === 'expense' ? -transactionEdited.amount : transactionEdited.amount);
        updateAccountBalance(transactionEdited.accountId, adjustment);
      } else {
        updateAccountBalance(transactionToEdit.accountId, transactionEdited.type === 'expense' ? transactionEdited.amount : -transactionEdited.amount);
        updateAccountBalance(transactionEdited.accountId, transactionEdited.type === 'expense' ? -transactionEdited.amount : transactionEdited.amount);
      }
      onCloseHandler();
    };

    return (
      <ExpensesSection title="Transacciones" loading={loading}>
        {!loading && transactions.length === 0 && (
          <p>No hay transacciones</p>
        )}
        <div className="flex flex-col gap-4">
          {Object.entries(transformedTransactions).map(
            ([_date, _transactions]) => (
              <div key={_date}>
                <h3 className="text-left mb-4">
                  {formatTransactionDate(_date)}
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
            )
          )}
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
