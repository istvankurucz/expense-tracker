export default function capitalizeString(string: string): string {
	return `${string[0]?.toUpperCase()}${string.substring(1)}`;
}
