import PropTypes from "prop-types";
import DropdownList from "./DropdownList/DropdownList";
import DropdownListItem from "./DropdownList/DropdownListItem/DropdownListItem";
import "./Dropdown.css";

function Dropdown({ className = "", children }) {
	return <div className={`dropdown${className !== "" ? ` ${className}` : ""}`}>{children}</div>;
}

Dropdown.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Dropdown.List = DropdownList;
Dropdown.List.Item = DropdownListItem;

export default Dropdown;
