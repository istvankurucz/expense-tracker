import PropTypes from "prop-types";
import "./DropdownListItem.css";

function DropdownListItem({ children }) {
	return <li className="dropdownListItem">{children}</li>;
}

DropdownListItem.propTypes = {
	children: PropTypes.node.isRequired,
};

export default DropdownListItem;
