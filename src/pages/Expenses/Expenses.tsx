import { formatMoney } from "@/utils";
import { useAccounts, useTransactions } from "./hooks";
import { AccountList, ExpensesChart, ExpensesSection, ExpensesTrend, TransactionList } from "./components";
import { ExpensesProvider } from "./contexts";

function Expenses() {
    const { accounts, loadingAccounts, updateAccountBalance } = useAccounts();
    const { transactions, loadingTransactions, newTransaction, editTransaction, deleteTransaction } = useTransactions();

    const total = accounts.reduce((acc, cur) => acc + cur.balance, 0);

    return (
        <ExpensesProvider value={{ accounts, newTransaction, editTransaction, updateAccountBalance, deleteTransaction }}>
            <div className="min-h-full">
                <div className="bg-slate-800 rounded-b-lg text-center mb-8">
                    <div className="p-3">
                        <h1 className="text-xl">Agosto</h1>
                    </div>
                    <div className="pb-4">
                        <p className="text-slate-300">Saldo en las cuentas</p>
                        <p className="text-3xl">{formatMoney(total)}</p>
                    </div>
                </div>
                <AccountList loading={loadingAccounts} accounts={accounts} />
                <ExpensesSection title="Resumen de gastos" loading={loadingTransactions}>
                    <ExpensesChart transactions={transactions}/>
                </ExpensesSection>
                <ExpensesSection title="Tendencia de gastos" loading={loadingTransactions}>
                    <ExpensesTrend transactions={transactions}/>
                </ExpensesSection>
                <TransactionList loading={loadingTransactions} transactions={transactions} />
            </div>
        </ExpensesProvider>
    );
}

export default Expenses;
