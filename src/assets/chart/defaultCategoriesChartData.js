import categories from "../categories";

const filteredCategories = categories.filter((category) => category.type === "expense");

export const defaultCategoriesChartLegend = filteredCategories.map((category) => ({
	color: category.colors.text,
	text: category.text,
}));

const defaultCategoriesChartData = filteredCategories.map((category, i) => ({
	fromDegree: i * (360 / filteredCategories.length),
	degree: 360 / filteredCategories.length,
	color: category.colors.text,
	name: category.text,
	value: "0 %",
}));

export default defaultCategoriesChartData;
