export default function sortByProperty(property, asc) {
	return (a, b) => {
		if (a[property] < b[property]) return asc ? -1 : 1;
		if (a[property] > b[property]) return asc ? 1 : -1;
		return 0;
	};
}
