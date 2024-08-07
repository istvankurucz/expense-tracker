import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AlertSectionIcon.css";

function AlertSectionIcon({ icon }) {
	return <FontAwesomeIcon icon={icon} className="alertSectionIcon" />;
}

AlertSectionIcon.propTypes = {
	icon: PropTypes.object.isRequired,
};

export default AlertSectionIcon;
