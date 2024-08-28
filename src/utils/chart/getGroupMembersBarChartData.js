function groupTransactionsByUser(transactions = []) {
	const orderedTransactionsObject = Object.groupBy(
		transactions,
		(transaction) => transaction.user.id
	);

	return Object.values(orderedTransactionsObject);
}

function calcGroupAmount(groups = []) {
	const groupAmounts = groups.map((userGroup) => {
		const sum = userGroup.reduce(
			(total, currentTransaction) => total + currentTransaction.amount,
			0
		);
		return { user: userGroup[0].user, amount: sum };
	});

	return groupAmounts.toSorted((a, b) => b.amount - a.amount);
}

function calcBarHeights(groups = []) {
	const maxAmount = groups[0].amount;

	const groupsWithHeights = groups.map((userGroup) => {
		const height = (userGroup.amount / maxAmount) * 100;
		return { ...userGroup, height };
	});

	return groupsWithHeights;
}

export default function getGroupMembersBarChartData(transactions = []) {
	const groupedTransactions = groupTransactionsByUser(transactions);
	const groupsWithAmount = calcGroupAmount(groupedTransactions);
	const groupsWithHeights = calcBarHeights(groupsWithAmount);

	const chartData = groupsWithHeights.map((userGroup, i) => ({
		height: userGroup.height,
		color: `var(--chart-color-${(i % 10) + 1})`,
		name: userGroup.user.name,
		value: userGroup.amount,
	}));

	return chartData;
}
