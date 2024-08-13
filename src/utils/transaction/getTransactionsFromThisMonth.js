import getYearAndMonth from "../general/getYearAndMonth";

export default function getTransactionsFromThisMonth(transactions = []) {
	const { year: thisYear, month: thisMonth } = getYearAndMonth();

	const transactionsThisMonth = transactions.filter((transaction) => {
		const transactionDate = new Date(transaction.date);
		const { year: transactionYear, month: transactionMonth } = getYearAndMonth(transactionDate);

		return thisYear === transactionYear && thisMonth === transactionMonth;
	});

	return transactionsThisMonth;
}
