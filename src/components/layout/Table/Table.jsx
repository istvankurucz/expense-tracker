import PropTypes from "prop-types";
import "./Table.css";

function Table({ sortable = false, className = "", children }) {
	return (
		<div className="table__container scrollbar">
			<table
				className={`table${sortable ? " table--sortable" : ""}${
					className !== "" ? ` ${className}` : ""
				}`}>
				{children}
			</table>
		</div>
	);
}

Table.propTypes = {
	sortable: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Table;
