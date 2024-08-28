export default function getCategoryPieChartData(groups = []) {
	// Calculate the amount for every category
	const sumOfCateories = groups.map((categoryGroup) => {
		const sumOfCategory = categoryGroup.reduce(
			(total, currentTransaction) => total + currentTransaction.amount,
			0
		);

		return { category: categoryGroup[0].category, amount: sumOfCategory };
	});

	// Calculate the total amount of all categories
	const totalAmount = sumOfCateories.reduce(
		(total, currentCategory) => total + currentCategory.amount,
		0
	);

	// Get the values for the chart
	let fromDegree = 0;
	const newChartData = sumOfCateories.map((category) => {
		// Calculate degree of the category
		const ratio = category.amount / totalAmount;
		const degree = ratio * 360;

		// Update fromDegree
		fromDegree += degree;

		return {
			fromDegree: fromDegree - degree,
			degree,
			color: category.category.colors.text,
			name: category.amount,
			value: `${Math.round(ratio * 100)} %`,
		};
	});

	return newChartData;
}
