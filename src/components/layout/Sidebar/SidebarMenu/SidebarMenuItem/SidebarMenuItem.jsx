import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./SidebarMenuItem.css";

function SidebarMenuItem({ link, active = false, className = "", children }) {
	return (
		<li
			className={`sidebarMenuItem${active ? " sidebarMenuItem--active" : ""}${
				className ? ` ${className}` : ""
			}`}
		>
			<Link to={link}>{children}</Link>
		</li>
	);
}

SidebarMenuItem.propTypes = {
	link: PropTypes.string.isRequired,
	active: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default SidebarMenuItem;
