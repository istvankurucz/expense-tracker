export default function sortByCategory(asc) {
	return (a, b) => {
		const aText = a.category.text.toLowerCase();
		const bText = b.category.text.toLowerCase();

		if (aText < bText) return asc ? -1 : 1;
		if (aText > bText) return asc ? 1 : -1;
		return 0;
	};
}
