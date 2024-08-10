import { formatMoney } from "@/utils";
import { useAccounts, useTransactions } from "./hooks";
import { AccountList, TransactionList } from "./components";
import { ExpensesProvider } from "./contexts";

function Expenses() {
    const { accounts, loadingAccounts, updateAccountBalance } = useAccounts();
    const { transactions, loadingTransactions, newTransaction, editTransaction, deleteTransaction } = useTransactions();

    const total = accounts.reduce((acc, cur) => acc + cur.balance, 0);

    return (
        <ExpensesProvider value={{ accounts, newTransaction, editTransaction, updateAccountBalance, deleteTransaction }}>
            <div className="min-h-full bg-gray-800 text-white px-4 pb-4">
                <div className="bg-gray-700 rounded-b-lg text-center mb-8">
                    <div className="p-3">
                        <h1 className="text-xl">Agosto</h1>
                    </div>
                    <div className="pb-4">
                        <p className="text-slate-300">Saldo en las cuentas</p>
                        <p className="text-3xl">{formatMoney(total)}</p>
                    </div>
                </div>
                <AccountList loading={loadingAccounts} accounts={accounts} />
                <TransactionList loading={loadingTransactions} transactions={transactions} />
            </div>
        </ExpensesProvider>
    );
}

export default Expenses;
