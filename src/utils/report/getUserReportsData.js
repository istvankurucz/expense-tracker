import defaultBalanceChartData from "../../assets/chart/defaultBalanceChartData";
import getBarHeights from "../chart/getBarHeights";
import getCategoryPieChartData from "../chart/getCategoryPieChartData";
import getCategoryPieChartLegend from "../chart/getCategoryPieChartLegend";
import groupTransactions from "../transaction/groupTransactions";
import sumTransactions from "../transaction/sumTransactions";
import getReportDate from "./getReportDate";
import groupTransactionsByTime from "./groupTransactionsByTime";

export default function getReportsData(transactions = [], index = 0) {
	const groupedByTime = groupTransactionsByTime(transactions, index);

	const data = groupedByTime.map((group) => {
		// Balance (bar) chart data
		const sums = sumTransactions(group);
		const heights = getBarHeights(sums);
		const balanceChartData = [
			{
				...defaultBalanceChartData[0],
				value: sums.sumOfIncomes,
				width: "8rem",
				height: heights.incomeHeight,
			},
			{
				...defaultBalanceChartData[1],
				value: sums.sumOfExpenses,
				width: "8rem",
				height: heights.expenseHeight,
			},
		];

		// Categories (pie) chart data
		const categorizedTransactions = groupTransactions(group);
		const categoriesChartData = getCategoryPieChartData(categorizedTransactions);
		const categoriesChartLegend = getCategoryPieChartLegend(categorizedTransactions);

		return {
			date: getReportDate(group[0].date, index),
			balanceChart: {
				data: balanceChartData,
			},
			categoriesChart: {
				data: categoriesChartData,
				legend: categoriesChartLegend,
			},
		};
	});

	return data;
}
