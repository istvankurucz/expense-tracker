import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUserGear } from "@fortawesome/free-solid-svg-icons";
import ShadowBox from "../../layout/ShadowBox/ShadowBox";
import Button from "../Button/Button";
import "./GroupRow.css";

function GroupRow({ id, name, isAdmin, className = "" }) {
	return (
		<ShadowBox>
			<Link
				to={`/groups/${id}/overview`}
				className={`groupRow${className !== "" ? ` ${className}` : ""}`}
			>
				<span className="groupRow__name">{name}</span>
				{isAdmin && (
					<FontAwesomeIcon icon={faUserGear} title="Admin" className="groupRow__admin" />
				)}

				<Button variant="primary" icon className="groupRow__arrow">
					<FontAwesomeIcon icon={faArrowRight} />
				</Button>
			</Link>
		</ShadowBox>
	);
}

GroupRow.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	isAdmin: PropTypes.bool,
	className: PropTypes.string,
};

export default GroupRow;
