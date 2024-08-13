export default function getYearAndMonth(date = new Date()) {
	const year = date.getFullYear();
	const month = date.getMonth();

	return { year, month };
}
