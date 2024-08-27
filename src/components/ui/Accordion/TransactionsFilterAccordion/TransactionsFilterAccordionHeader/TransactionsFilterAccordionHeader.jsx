import PropTypes from "prop-types";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Accordion from "../../Accordion";
import "./TransactionsFilterAccordionHeader.css";

function TransactionsFilterAccordionHeader({ children }) {
	return (
		<Accordion.Header
			className="transactionsFilterAccordionHeader"
			icon={faAngleDown}
			rotateIcon={false}
			justify="space-between">
			{children}
		</Accordion.Header>
	);
}

TransactionsFilterAccordionHeader.propTypes = {
	children: PropTypes.node.isRequired,
};

export default TransactionsFilterAccordionHeader;
