import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./TransactionsFilterAccordionHeader.css";

function TransactionsFilterAccordionHeader({ text }) {
	return (
		<div className="transactionsFilterAccordionHeader">
			<span className="transactionsFilterAccordionHeader__text">{text}</span>
			<FontAwesomeIcon icon={faAngleDown} />
		</div>
	);
}

TransactionsFilterAccordionHeader.propTypes = {
	text: PropTypes.string.isRequired,
};

export default TransactionsFilterAccordionHeader;
