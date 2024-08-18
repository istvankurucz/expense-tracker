import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import CategoryIcon from "../../ui/CategoryIcon/CategoryIcon";
import formatPrice from "../../../utils/format/formatPrice";
import "./TransactionsTable.css";

function TransactionsTable({ cols = [], transactions = [], isGroupTransactions, className = "" }) {
	// States
	const [sorting, setSorting] = useState({ property: "amount", direction: "desc" });

	// console.log("Transactions:", transactions);

	// Variables
	const orderedTransactions = transactions.toSorted(
		sortByProperty(sorting.property, sorting.direction)
	);
	// console.log("Ordered:", orderedTransactions);

	// Functions
	function getThText(col) {
		if (col.name === "ref") {
			if (isGroupTransactions) return "Tag";
			else return "Csoport";
		} else return col.text;
	}

	function getThContent(col) {
		const text = getThText(col);

		return (
			<div className="transactions__table__th">
				{text}
				{col.name === sorting.property && (
					<FontAwesomeIcon icon={sorting.direction === "asc" ? faCaretUp : faCaretDown} />
				)}
			</div>
		);
	}

	function setSortingParams(col) {
		if (col.name === sorting.property) {
			setSorting((sorting) => ({
				property: sorting.property,
				direction: sorting.direction === "asc" ? "desc" : "asc",
			}));
		} else {
			setSorting({
				property: col.name,
				direction: "desc",
			});
		}
	}

	function sortByProperty(property = "date", direction = "desc") {
		if (property === "category") {
			return (a, b) => {
				if (a[property].text.toLowerCase() > b[property].text.toLowerCase())
					return direction === "asc" ? 1 : -1;
				if (a[property].text.toLowerCase() < b[property].text.toLowerCase())
					return direction === "asc" ? -1 : 1;
				return 0;
			};
		}

		if (property === "name" || property == "comment	") {
			return (a, b) => {
				if (a[property].toLowerCase() > b[property].toLowerCase())
					return direction === "asc" ? 1 : -1;
				if (a[property].toLowerCase() < b[property].toLowerCase())
					return direction === "asc" ? -1 : 1;
				return 0;
			};
		}

		if (property === "ref") {
			property = isGroupTransactions ? "user" : "group";

			return (a, b) => {
				if (a[property] == null || b[property] == null) return 0;
				if (a[property].name.toLowerCase() > b[property].name.toLowerCase())
					return direction === "asc" ? 1 : -1;
				if (a[property].name.toLowerCase() < b[property].name.toLowerCase())
					return direction === "asc" ? -1 : 1;
				return 0;
			};
		}

		return (a, b) => {
			if (a[property] > b[property]) return direction === "asc" ? 1 : -1;
			if (a[property] < b[property]) return direction === "asc" ? -1 : 1;
			return 0;
		};
	}

	return (
		<div className="transactionsTable__container scrollbar">
			<table className={`transactions__table${className !== "" ? ` ${className}` : ""}`}>
				<thead>
					<tr>
						{cols.map((col) => {
							if (col.visible) {
								return (
									<th
										key={col.name}
										colSpan={col.name === "category" ? 2 : 1}
										onClick={() => setSortingParams(col)}>
										{getThContent(col)}
									</th>
								);
							} else return <Fragment key={col.name}></Fragment>;
						})}
					</tr>
				</thead>

				<tbody>
					{orderedTransactions.map((transaction) => (
						<tr key={transaction.id}>
							{cols[0].visible && (
								<>
									<td className="transactionsTable__categoryIcon">
										<CategoryIcon category={transaction.category} />
									</td>
									<td className="transactionsTable__categoryText">
										{transaction.category.text}
									</td>
								</>
							)}
							{cols[1].visible && (
								<td className="transactionsTable__date">
									{transaction.date.toLocaleDateString().replaceAll(" ", "")}
								</td>
							)}
							{cols[2].visible && (
								<td className="transactionsTable__name">{transaction.name}</td>
							)}
							{cols[3].visible && (
								<td className="transactionsTable__comment">{transaction.comment}</td>
							)}
							{cols[4].visible && (
								<td className="transactionsTable__ref">
									{isGroupTransactions ? transaction.user?.name : transaction.group?.name}
								</td>
							)}
							{cols[5].visible && (
								<td
									className={`transactionsTable__amount transactionsTable__amount--${transaction.type}`}>
									{transaction.type === "expense"
										? "-"
										: transaction.type === "income"
										? "+"
										: ""}
									{formatPrice(transaction.amount)}
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

TransactionsTable.propTypes = {
	cols: PropTypes.array.isRequired,
	transactions: PropTypes.array.isRequired,
	isGroupTransactions: PropTypes.bool.isRequired,
	className: PropTypes.string,
};

export default TransactionsTable;
