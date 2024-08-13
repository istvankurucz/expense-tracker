export default function groupTransactions(transactions = []) {
	const groupedTransactionsObject = Object.groupBy(
		transactions,
		(transaction) => transaction.category.name
	);

	return Object.values(groupedTransactionsObject);
}
