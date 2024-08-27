export default function formatMonth(date = new Date()) {
	const formatter = new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "long",
	});

	return formatter.format(date);
}
