export default function getTransactionAmountSign(type = "expense") {
	if (type === "expense") return "-";
	if (type === "income") return "+";
	return "";
}
