import PropTypes from "prop-types";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faRectangleList } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import useCloseSidebar from "../../../hooks/dom/useCloseSidebar";
import Divider from "../../../components/ui/Divider/Divider";
import checkActiveMenuItem from "../../../utils/dom/checkActiveMenuItem";
import "./ProfileSidebar.css";

function ProfileSidebar({ show, setShow }) {
	const [{ user }] = useStateValue();
	useCloseSidebar(setShow);

	return (
		<Sidebar show={show} setShow={setShow}>
			<h3 className="profileSidebar__title">{user?.displayName}</h3>

			<nav className="profileSidebar__nav">
				<Sidebar.Menu>
					<Sidebar.Menu.Item
						link="/profile/data"
						active={checkActiveMenuItem("/profile/data")}
					>
						<FontAwesomeIcon icon={faDatabase} />
						Adataim
					</Sidebar.Menu.Item>

					<Divider />

					<Sidebar.Menu.Item
						link="/profile/reports"
						active={checkActiveMenuItem("/profile/reports")}
					>
						<FontAwesomeIcon icon={faRectangleList} />
						Jelentések
					</Sidebar.Menu.Item>
				</Sidebar.Menu>
			</nav>
		</Sidebar>
	);
}

ProfileSidebar.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
};

export default ProfileSidebar;
