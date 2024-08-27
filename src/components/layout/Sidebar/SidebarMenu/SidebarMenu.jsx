import PropTypes from "prop-types";
import SidebarMenuItem from "./SidebarMenuItem/SidebarMenuItem";
import "./SidebarMenu.css";

function SidebarMenu({ className = "", children }) {
	return <ul className={`sidebarMenu${className !== "" ? ` ${className}` : ""}`}>{children}</ul>;
}

SidebarMenu.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

SidebarMenu.Item = SidebarMenuItem;

export default SidebarMenu;
