export default function checkActiveMenuItem(endpoint) {
	const { pathname } = window.location;
	return pathname.includes(endpoint);
}
