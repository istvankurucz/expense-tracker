import PropTypes from "prop-types";
import "./TransactionsAccordionHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function TransactionsAccordionHeader({ text }) {
	return (
		<div className="transactionsAccordionHeader">
			<span className="transactionsAccordionHeader__text">{text}</span>
			<FontAwesomeIcon icon={faCaretDown} />
		</div>
	);
}

TransactionsAccordionHeader.propTypes = {
	text: PropTypes.string.isRequired,
};

export default TransactionsAccordionHeader;
