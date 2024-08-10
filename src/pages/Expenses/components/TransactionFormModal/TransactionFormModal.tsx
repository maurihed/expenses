import { useState } from "react";
import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { ModalSelector } from "@/componets";
import { Account, Categories, Transaction } from "@/types";
import { getCategoryIconName, parseDatePickerValue, toDatePickerFormat } from "@/utils";
import { useExpensesContext } from "../../contexts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
} & (
  {
    transaction?: undefined;
    account: Account;
    action: (transaction: Transaction) => void;
  } | (
    {
      transaction: Transaction;
      account?: undefined;
      action: (transactionToEdit: Transaction, transactionEdited: Transaction) => void;
    }
  )
)

const EMPTY_TRANSACTION: Transaction = {
  id: "",
  type: "expense",
  accountId: "",
  amount: 0,
  description: "",
  date: new Date(),
  category: Categories.SUPERMERCADO,
}

const CATEGORIES = Object.values(Categories).map((category) => ({
  icon: getCategoryIconName(category), value: category, name: category
}));

function TransactionFormModal({ isOpen, onClose, transaction, account, action }: Props) {
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction>(transaction ? {...transaction, date: transaction.date } : {...EMPTY_TRANSACTION, accountId: account?.id ?? ''});
  const { accounts, deleteTransaction, updateAccountBalance } = useExpensesContext();
  const formattedAccounts = accounts.map((account) => ({
    icon: 'wallet' as IconName,
    value: account.id,
    name: account.name
  }))

  const handleChange = (prop: string, value: string | Date) => {
    let parsedValue: string | number | Date = value;
    if (prop === 'amount') {
      parsedValue = Number(value);
    }
    setTransactionToEdit({ ...transactionToEdit, [prop]: parsedValue });
  }

  const saveTransaction = () => {
    if (transaction) {
      action(transaction, transactionToEdit);
    } else {
      action(transactionToEdit);
    }
    onClose();
  }

  const deleteTransactionWrapper = () => {
    if (transaction) {
      deleteTransaction(transaction.id);
      updateAccountBalance(transaction.accountId, transaction.type === 'expense' ? transaction.amount : -transaction.amount);
    }
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalContent>
        <ModalHeader>
          <div className="w-full flex justify-between align-center pr-4">
            <span>Transaccíon</span>
            {transaction && <Button variant="bordered" color="danger" onClick={deleteTransactionWrapper}>Eliminar</Button>}
          </div>
        </ModalHeader>
        <ModalBody>
          <Input autoFocus label="Cantidad" value={transactionToEdit.amount.toString()} onChange={(e) => handleChange('amount', e.target.value)} />
          <Input label="Descripción" value={transactionToEdit.description} onChange={(e) => handleChange('description', e.target.value)} />
          <DatePicker label="Fecha" value={toDatePickerFormat(transactionToEdit.date)} onChange={(e) => handleChange('date', parseDatePickerValue(e))} />
          <ModalSelector items={CATEGORIES} value={transactionToEdit.category} onChange={(e) => handleChange('category', e)} />
          <ModalSelector items={formattedAccounts} value={transactionToEdit.accountId} onChange={(e) => handleChange('accountId', e)} />
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" color="danger" onClick={onClose}>Cancelar</Button>
          <Button onClick={saveTransaction}>Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TransactionFormModal;
