import PropTypes from "prop-types";
import { useGroupContext } from "../../../contexts/group/GroupContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faInfo, faRectangleList } from "@fortawesome/free-solid-svg-icons";
import useCloseSidebar from "../../../hooks/dom/useCloseSidebar";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import Divider from "../../../components/ui/Divider/Divider";
import "./GroupSidebar.css";
import checkActiveMenuItem from "../../../utils/dom/checkActiveMenuItem";

function GroupSidebar({ show, setShow }) {
	useCloseSidebar(setShow);
	const { group } = useGroupContext();

	return (
		<Sidebar show={show} setShow={setShow}>
			<h3 className="groupSidebar__name">{group?.name}</h3>

			<nav className="groupSidebar__nav">
				<Sidebar.Menu>
					<Sidebar.Menu.Item
						link={`/groups/${group.id}/overview`}
						active={checkActiveMenuItem(`/groups/${group.id}/overview`)}
					>
						<FontAwesomeIcon icon={faInfo} />
						Áttekintés
					</Sidebar.Menu.Item>

					<Divider variant="secondary" />

					<Sidebar.Menu.Item
						link={`/groups/${group.id}/reports`}
						active={checkActiveMenuItem(`/groups/${group.id}/reports`)}
					>
						<FontAwesomeIcon icon={faRectangleList} />
						Jelentések
					</Sidebar.Menu.Item>

					<Divider variant="secondary" />

					<Sidebar.Menu.Item
						link={`/groups/${group.id}/settings`}
						active={checkActiveMenuItem(`/groups/${group.id}/settings`)}
					>
						<FontAwesomeIcon icon={faGear} />
						Beállítások
					</Sidebar.Menu.Item>
				</Sidebar.Menu>
			</nav>
		</Sidebar>
	);
}

GroupSidebar.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
};

export default GroupSidebar;
