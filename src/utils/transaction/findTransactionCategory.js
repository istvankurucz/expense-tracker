import categories from "../../assets/categories";

export default function findTransactionCategory(name) {
	return categories.find((category) => category.name === name);
}
