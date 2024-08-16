import { Icon } from "@/componets";
import { Transaction } from "@/types";
import { useExpensesContext } from "../../contexts";
import { formatMoney, getCategoryIconName } from "@/utils";
import classNames from "classnames";

function TransactionRow({ transaction, onClick }: { transaction: Transaction, onClick: (transaction: Transaction) => void}) {
  const { accounts } = useExpensesContext();

  const getAccountName = (accountId: string) => {
    const account = accounts.find((account) => account.id === accountId);
    return account?.name ?? "N/A";
  }

  const amount = transaction.type === 'expense' ? -transaction.amount : transaction.amount;
  const { iconName, color } = getCategoryIconName(transaction.category);

  return (
    <button className="w-full flex justify-between items-center" onClick={() => onClick(transaction)}>
        <span className={classNames("mr-4 shrink-0 w-10 h-10 rounded-full flex justify-center items-center", color)}>
          <Icon prefix="fas" name={iconName} />
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
