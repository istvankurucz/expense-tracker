import PropTypes from "prop-types";
import { faClose, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import "./Alert.css";

function Alert({
	show,
	setShow,
	variant = "secondary",
	icon = faExclamation,
	className = "",
	children,
}) {
	return (
		<div
			className={`alert alert--${variant}${show ? " alert--show" : ""}${
				className !== "" ? ` ${className}` : ""
			}`}
		>
			<div className="alert__icon">
				<FontAwesomeIcon icon={icon} />
			</div>

			<div className="alert__message">{children}</div>

			<Button variant="transparent" icon round onClick={() => setShow(false)}>
				<FontAwesomeIcon icon={faClose} />
			</Button>
		</div>
	);
}

Alert.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
	variant: PropTypes.oneOf(["primary", "secondary", "info", "accent", "success", "danger"]),
	icon: PropTypes.object,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Alert;
