export default function calcPageMinHeight() {
	// Sekect the header and footer element
	const header = document.querySelector(".header");
	const footer = document.querySelector(".footer");

	// If they are null return the default value
	if (header == null || footer == null) return "100svh";

	// Get the height of the elements
	const headerHeight = header.offsetHeight;
	const footerHeight = footer.offsetHeight;

	// Return the calculated min-height value
	return `calc(100svh - ${headerHeight}px - ${footerHeight}px - 1px)`;
}
