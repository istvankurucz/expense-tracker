import { useCallback, useEffect, useState } from "react";
import groupTransactions from "../../utils/transaction/groupTransactions";
import getCategoryPieChartData from "../../utils/chart/getCategoryPieChartData";
import getCategoryPieChartLegend from "../../utils/chart/getCategoryPieChartLegend";
import defaultCategoriesChartData, {
	defaultCategoriesChartLegend,
} from "../../assets/chart/defaultCategoriesChartData";

function useCategoriesChart(transactions = []) {
	// States
	const [index, setIndex] = useState(0);
	const [categorizedTransactions, setCategorizedTransactions] = useState(transactions);
	const [chartData, setChartData] = useState(defaultCategoriesChartData);
	const [chartLegend, setChartLegend] = useState(defaultCategoriesChartLegend);

	// Functions
	const filterTransactions = useCallback(
		(transactions = []) => {
			let filterType = "expense";
			if (index === 1) filterType = "income";

			const filteredTransactions = transactions.filter(
				(transaction) => transaction.type === filterType
			);
			return filteredTransactions;
		},
		[index]
	);

	useEffect(() => {
		// Filter the transactions based on type
		const filteredTransactions = filterTransactions(transactions);

		// Group transactions based on the categories
		const groupedTransactions = groupTransactions(filteredTransactions);
		setCategorizedTransactions(groupedTransactions);

		// Update chart data
		const data = getCategoryPieChartData(groupedTransactions);
		setChartData(data);

		// Update the chart legend
		const legend = getCategoryPieChartLegend(groupedTransactions);
		setChartLegend(legend);
	}, [transactions, index, filterTransactions]);

	return { index, setIndex, categorizedTransactions, chartData, chartLegend };
}

export default useCategoriesChart;
