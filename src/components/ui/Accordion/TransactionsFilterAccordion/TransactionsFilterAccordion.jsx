import PropTypes from "prop-types";
import Accordion from "../Accordion";
import TransactionsFilterAccordionHeader from "./TransactionsFilterAccordionHeader/TransactionsFilterAccordionHeader";
import "./TransactionsFilterAccordion.css";

function TransactionsFilterAccordion({ header, className = "", children }) {
	return (
		<Accordion
			header={header}
			className={`transactionsFilterAccordion${className !== "" ? ` ${className}` : ""}`}>
			{children}
		</Accordion>
	);
}

TransactionsFilterAccordion.propTypes = {
	header: PropTypes.node.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

TransactionsFilterAccordion.Header = TransactionsFilterAccordionHeader;

export default TransactionsFilterAccordion;
