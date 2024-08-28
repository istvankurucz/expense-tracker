import { useEffect, useState } from "react";
import getTransactionsFromThisMonth from "../../utils/transaction/getTransactionsFromThisMonth";
import sumTransactions from "../../utils/transaction/sumTransactions";
import getBarHeights from "../../utils/chart/getBarHeights";
import formatPrice from "../../utils/format/formatPrice";
import defaultBalanceChartData from "../../assets/chart/defaultBalanceChartData";

function useIncomeExpenseChart(transactions = []) {
	// States
	const [index, setIndex] = useState(0);
	const [chartData, setChartData] = useState(defaultBalanceChartData);

	// Functions
	function updateChartData(values, heights) {
		// Update the state
		setChartData((data) => {
			const incomeBar = {
				...data[0],
				height: heights.incomeHeight,
				value: formatPrice(values.sumOfIncomes),
			};
			const expenseBar = {
				...data[1],
				height: heights.expenseHeight,
				value: formatPrice(values.sumOfExpenses),
			};

			return [incomeBar, expenseBar];
		});
	}

	useEffect(() => {
		if (transactions.length === 0) return;

		let filteredTransactions = transactions;
		// Transactions this month
		if (index === 0) {
			filteredTransactions = getTransactionsFromThisMonth(transactions);
		}

		// Calculate chart data
		const sums = sumTransactions(filteredTransactions);
		const heights = getBarHeights(sums);

		// Update the state
		updateChartData(sums, heights);
	}, [transactions, index]);

	return { index, setIndex, chartData };
}

export default useIncomeExpenseChart;
