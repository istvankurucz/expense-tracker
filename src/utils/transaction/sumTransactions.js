export default function sumTransactions(transactions = []) {
	// Get the income and expense transactions
	const incomes = transactions.filter((transaction) => transaction.type === "income");
	const expenses = transactions.filter((transaction) => transaction.type === "expense");

	// Sum up the types
	const sumOfIncomes = incomes.reduce(
		(total, currentTransaction) => total + currentTransaction.amount,
		0
	);
	const sumOfExpenses = expenses.reduce(
		(total, currentTransaction) => total + currentTransaction.amount,
		0
	);

	return { sumOfIncomes, sumOfExpenses };
}
