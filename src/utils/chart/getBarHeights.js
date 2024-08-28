export default function getBarHeights(sums) {
	const { sumOfExpenses, sumOfIncomes } = sums;

	let incomeHeight, expenseHeight;
	if (sumOfIncomes > sumOfExpenses) {
		incomeHeight = 100;
		expenseHeight = (sumOfExpenses / sumOfIncomes) * 100;
	} else {
		expenseHeight = 100;
		incomeHeight = (sumOfIncomes / sumOfExpenses) * 100;
	}

	return { incomeHeight, expenseHeight };
}
