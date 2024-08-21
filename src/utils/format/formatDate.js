export default function formatDate(date = new Date()) {
	return date.toLocaleDateString().replaceAll(".", "").replaceAll(" ", "-");
}
