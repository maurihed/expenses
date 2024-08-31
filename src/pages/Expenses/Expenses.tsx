import { formatMoney, getCurrentDate } from "@/utils";
import { useAccounts, useTransactions } from "./hooks";
import {
  AccountList,
  ExpensesChart,
  ExpensesSection,
  ExpensesTrend,
  MonthYearPicker,
  TransactionList,
} from "./components";
import { ExpensesProvider } from "./contexts";
import { MonthYearType } from "@/types";
import { useState } from "react";

function Expenses() {
  const { month, year } = getCurrentDate();
  const [monthYearDate, setMonthYearDate] = useState<MonthYearType>({ month, year });
  const { accounts, loadingAccounts, updateAccountBalance } = useAccounts();
  const {
    transactions,
    loadingTransactions,
    newTransaction,
    editTransaction,
    deleteTransaction,
  } = useTransactions(monthYearDate);

  const total = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <ExpensesProvider
      value={{
        accounts,
        newTransaction,
        editTransaction,
        updateAccountBalance,
        deleteTransaction,
      }}
    >
      <div className="min-h-full">
        <div className="bg-slate-800 rounded-b-lg text-center mb-8">
          <MonthYearPicker value={monthYearDate} onChange={setMonthYearDate} />
          <div className="pb-4">
            <p className="text-slate-300">Total Gastado</p>
            <p className="text-3xl">{formatMoney(total)}</p>
          </div>
        </div>
        <AccountList loading={loadingAccounts} accounts={accounts} />
        <ExpensesSection
          title="5 Categorias con mas gastos"
          loading={loadingTransactions}
        >
          <ExpensesChart transactions={transactions} />
        </ExpensesSection>
        <ExpensesSection title="Tendencia de gastos" loading={loadingTransactions}>
          <ExpensesTrend transactions={transactions} />
        </ExpensesSection>
        <TransactionList loading={loadingTransactions} transactions={transactions} />
      </div>
    </ExpensesProvider>
  );
}

export default Expenses;
