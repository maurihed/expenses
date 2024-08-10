import { Icon } from "@/componets";
import { Transaction } from "@/types";
import { useExpensesContext } from "../../contexts";
import { formatMoney, getCategoryIconName } from "@/utils";

function TransactionRow({ transaction, onClick }: { transaction: Transaction, onClick: (transaction: Transaction) => void}) {
  const { accounts } = useExpensesContext();

  const getAccountName = (accountId: string) => {
    const account = accounts.find((account) => account.id === accountId);
    return account?.name ?? "N/A";
  }

  const amount = transaction.type === 'expense' ? -transaction.amount : transaction.amount;

  return (
    <button className="w-full flex justify-between items-center" onClick={() => onClick(transaction)}>
        <span className="mr-4 shrink-0 bg-green-700 w-10 h-10 rounded-full flex justify-center items-center">
          <Icon prefix="fas" name={getCategoryIconName(transaction.category)} />
        </span>
        <div className="text-left grow">
            <div>{transaction.description}</div>
            <div className="text-slate-400">{transaction.category} | {getAccountName(transaction.accountId)}</div>
        </div>
        <span className={amount > 0 ? "text-green-400" : "text-red-400"}>{formatMoney(amount)}</span>
    </button>
  );
}

export default TransactionRow;
