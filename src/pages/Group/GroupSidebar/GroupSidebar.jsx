import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDoubleRight,
	faGear,
	faInfo,
	faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/ui/Button/Button";
import "./GroupSidebar.css";

function GroupSidebar({ show, setShow }) {
	return (
		<aside className={`groupSidebar${show ? " groupSidebar--show" : ""}`}>
			<nav className="groupSidebar__nav">
				<ul className="groupSidebar__menu">
					<li className="groupSidebar__menu__item">
						<Link to="">
							<FontAwesomeIcon icon={faInfo} />
							Áttekintés
						</Link>
					</li>
					<li className="groupSidebar__menu__item">
						<Link to="">
							<FontAwesomeIcon icon={faRectangleList} />
							Jelentések
						</Link>
					</li>
					<li className="groupSidebar__menu__item">
						<Link to="">
							<FontAwesomeIcon icon={faGear} />
							Beállítások
						</Link>
					</li>
				</ul>
			</nav>

			<Button
				variant="info"
				title="Menü"
				className="groupSidebar__button"
				onClick={() => setShow((show) => !show)}>
				<FontAwesomeIcon icon={faAngleDoubleRight} />
			</Button>
		</aside>
	);
}

GroupSidebar.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
};

export default GroupSidebar;
