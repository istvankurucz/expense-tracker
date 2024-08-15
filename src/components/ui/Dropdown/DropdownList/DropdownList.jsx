import PropTypes from "prop-types";
import "./DropdownList.css";
import useCloseDropdown from "../../../../hooks/dom/useCloseDropdown";

function DropdownList({ show, setShow, children }) {
	useCloseDropdown(show, setShow);

	return <ul className={`dropdownList${show ? " dropdownList--show" : ""}`}>{children}</ul>;
}

DropdownList.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

export default DropdownList;
