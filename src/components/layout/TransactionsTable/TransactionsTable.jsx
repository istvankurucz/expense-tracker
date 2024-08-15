import PropTypes from "prop-types";
import CategoryIcon from "../../ui/CategoryIcon/CategoryIcon";
import formatPrice from "../../../utils/format/formatPrice";
import "./TransactionsTable.css";
import { Fragment } from "react";

function TransactionsTable({ cols = [], transactions = [], isGroupTransactions, className = "" }) {
	return (
		<div className="transactionsTable__container scrollbar">
			<table className={`transactions__table${className !== "" ? ` ${className}` : ""}`}>
				<thead>
					<tr>
						{cols.map((col) => {
							if (col.visible) {
								return (
									<th key={col.name} colSpan={col.name === "category" ? 2 : 1}>
										{col.name === "ref"
											? isGroupTransactions
												? "Tag"
												: "Csoport"
											: col.text}
									</th>
								);
							} else return <Fragment key={col.name}></Fragment>;
						})}
					</tr>
				</thead>

				<tbody>
					{transactions.map((transaction) => (
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
									className={`transactionsTable__amount transactionsTable__amount--${transaction.type}`}
								>
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
