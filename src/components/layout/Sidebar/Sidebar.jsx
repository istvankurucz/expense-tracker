import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import Button from "../../ui/Button/Button";
import "./Sidebar.css";
import SidebarMenu from "./SidebarMenu/SidebarMenu";

function Sidebar({ show, setShow, className = "", children }) {
	return (
		<aside
			className={`sidebar${show ? " sidebar--show" : ""}${
				className !== "" ? ` ${className}` : ""
			}`}>
			<Button
				variant="info"
				title="Menü"
				className="sidebar__button"
				onClick={() => setShow((show) => !show)}>
				<FontAwesomeIcon icon={faAngleDoubleRight} />
			</Button>
			{children}
		</aside>
	);
}

Sidebar.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Sidebar.Menu = SidebarMenu;

export default Sidebar;
