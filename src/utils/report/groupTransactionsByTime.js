export default function groupTransactionsByTime(transactions = [], index = 0) {
	const groupedTransactions = Object.groupBy(transactions, (transaction) => {
		if (index === 0) return `${transaction.date.getFullYear}-${transaction.date.getMonth() + 1}`;
		if (index === 1) return transaction.date.getFullYear;
	});
	return Object.values(groupedTransactions);
}
