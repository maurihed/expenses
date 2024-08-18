import { Doughnut } from 'react-chartjs-2';
import { Transaction } from '@/types';
import { getCategoryIconName } from "@/utils";
import { useMemo } from 'react';
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);


export default function ExpensesChart({ transactions }: {transactions: Transaction[]}) {
  const data: Record<string, number> = useMemo(() => {
    const temporal: Record<string, number> = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        if (transaction.category in temporal){
          temporal[transaction.category] = temporal[transaction.category] + transaction.amount;
        } else {
          temporal[transaction.category] = transaction.amount;
        }
      });
    return temporal;
  }, [transactions]);

  const chartData = useMemo(() => ({
    labels: Object.keys(data),
    datasets: [{
      data: Object.values(data),
      backgroundColor: Object.keys(data).map((category) => getCategoryIconName(category).rawColor),
      borderWidth: 0,
    }]
  }), [data]);

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-3xl'>
        <Doughnut data={chartData} options={{
          color: '#fff',
          plugins: {
            legend: {
              labels: {
                  font: {
                      size: 14,
                      family: "Moderustic",
                  },
              },
          },
          }
        }} />
      </div>
    </div>
  );
}
