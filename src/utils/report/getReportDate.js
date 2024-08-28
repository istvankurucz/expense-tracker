import formatMonth from "../format/formatMonth";

export default function getReportDate(date = new Date(), index = 0) {
	let dateString;
	if (index === 0) dateString = formatMonth(date);
	if (index === 1) dateString = date.toLocaleDateString().substring(0, 4);

	return dateString;
}
