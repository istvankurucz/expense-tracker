import PropTypes from "prop-types";
import { useRef } from "react";
import "./DropdownList.css";
import useCloseDropdown from "../../../../hooks/dom/useCloseDropdown";

function DropdownList({ show, setShow, className = "", children }) {
	const dropdownListRef = useRef();
	useCloseDropdown(show, setShow);

	return (
		<ul
			ref={dropdownListRef}
			className={`dropdownList${show ? " dropdownList--show" : ""}${
				className !== "" ? ` ${className}` : ""
			}`}>
			{children}
		</ul>
	);
}

DropdownList.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default DropdownList;
