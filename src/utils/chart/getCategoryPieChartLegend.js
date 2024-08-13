export default function getCategoryPieChartLegend(groups = []) {
	const newLegend = groups.map((categoryGroup) => ({
		color: categoryGroup[0].category.colors.text,
		text: categoryGroup[0].category.text,
	}));

	return newLegend;
}
