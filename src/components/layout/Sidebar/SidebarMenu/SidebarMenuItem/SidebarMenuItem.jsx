import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./SidebarMenuItem.css";

function SidebarMenuItem({ link, className = "", children }) {
	return (
		<li className={`sidebarMenuItem${className ? ` ${className}` : ""}`}>
			<Link to={link}>{children}</Link>
		</li>
	);
}

SidebarMenuItem.propTypes = {
	link: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default SidebarMenuItem;
