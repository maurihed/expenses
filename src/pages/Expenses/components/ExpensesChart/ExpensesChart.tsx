import { Doughnut } from "react-chartjs-2";
import { Transaction } from "@/types";
import { getCategoryIconName } from "@/utils";
import { useMemo } from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

export default function ExpensesChart({ transactions }: { transactions: Transaction[] }) {
  const [labels, entries] = useMemo(() => {
    return Object.entries(
      transactions
        .filter((t) => t.type === "expense")
        .reduce((acc: Record<string, number>, curr) => {
          if (curr.category in acc) {
            acc[curr.category] = acc[curr.category] + curr.amount;
          } else {
            acc[curr.category] = curr.amount;
          }
          return acc;
        }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .reduce(
        (acc: [string[], number[]], [key, value]) => {
          acc[0].push(key);
          acc[1].push(value);
          return acc;
        },
        [[], []]
      );
  }, [transactions]);

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: entries,
          backgroundColor: labels.map(
            (category) => getCategoryIconName(category).rawColor
          ),
          borderWidth: 0,
        },
      ],
    }),
    [labels, entries]
  );

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl">
        <Doughnut
          data={chartData}
          options={{
            color: "#fff",
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 14,
                    family: "Moderustic",
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
