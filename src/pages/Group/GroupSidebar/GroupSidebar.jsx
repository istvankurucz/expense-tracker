import PropTypes from "prop-types";
import { useGroupContext } from "../../../contexts/group/GroupContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDoubleRight,
	faGear,
	faInfo,
	faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/ui/Button/Button";
import useCloseSidebar from "../../../hooks/dom/useCloseSidebar";
import "./GroupSidebar.css";

function GroupSidebar({ show, setShow }) {
	useCloseSidebar(setShow);
	const { group } = useGroupContext();

	return (
		<aside className={`groupSidebar${show ? " groupSidebar--show" : ""}`}>
			<h3 className="groupSidebar__name">{group?.name}</h3>

			<nav className="groupSidebar__nav">
				<ul className="groupSidebar__menu">
					<li className="groupSidebar__menu__item">
						<Link to={`/groups/${group.id}/overview`}>
							<FontAwesomeIcon icon={faInfo} />
							Áttekintés
						</Link>
					</li>

					<hr className="groupSidebar__menu__divider" />

					<li className="groupSidebar__menu__item">
						<Link to="">
							<FontAwesomeIcon icon={faRectangleList} />
							Jelentések
						</Link>
					</li>

					<hr className="groupSidebar__menu__divider" />

					<li className="groupSidebar__menu__item">
						<Link to={`/groups/${group.id}/settings`}>
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
				onClick={() => setShow((show) => !show)}
			>
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
