import PropTypes from "prop-types";
import { Fragment, useLayoutEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faSort } from "@fortawesome/free-solid-svg-icons";
import CategoryIcon from "../../ui/CategoryIcon/CategoryIcon";
import formatPrice from "../../../utils/format/formatPrice";
import useTransactionsTable from "../../../hooks/transaction/useTransactionsTable";
import "./TransactionsTable.css";

function TransactionsTable({ cols = [], transactions = [], isGroupTransactions, className = "" }) {
	// States
	const { sortedTransactions, sorting, setSortingParams } = useTransactionsTable(transactions);

	// console.log("Sorted:", sortedTransactions);

	const containerRef = useRef();
	useLayoutEffect(() => {
		containerRef.current.scrollTo({
			left: 1000,
		});
	}, []);

	// Functions
	function getThText(col) {
		if (col.name === "ref") {
			if (isGroupTransactions) return "Tag";
			else return "Csoport";
		} else return col.text;
	}

	function getThIcon(col) {
		// Array of sortable columns
		const sortableCols = ["category", "date", "amount"];

		// If the given col is the sorted property
		if (sorting.property === col.name)
			return (
				<FontAwesomeIcon
					icon={sorting.asc ? faCaretUp : faCaretDown}
					className="transactions__table__th__icon transactions__table__th__icon--text"
				/>
			);

		// If the column is sortable
		if (sortableCols.includes(col.name))
			return (
				<FontAwesomeIcon
					icon={faSort}
					className="transactions__table__th__icon transactions__table__th__icon--info"
				/>
			);

		return <></>;
	}

	return (
		<div ref={containerRef} className="transactionsTable__container scrollbar">
			<table className={`transactions__table${className !== "" ? ` ${className}` : ""}`}>
				<thead>
					<tr>
						{cols.map((col) => {
							if (col.visible) {
								return (
									<th
										key={col.name}
										colSpan={col.name === "category" ? 2 : 1}
										onClick={() => setSortingParams(col.name)}>
										<div className="transactions__table__th">
											{getThText(col)}
											{getThIcon(col)}
										</div>
									</th>
								);
							} else return <Fragment key={col.name}></Fragment>;
						})}
					</tr>
				</thead>

				<tbody>
					{sortedTransactions.map((transaction) => (
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
