import "./Divider.css";
import PropTypes from "prop-types";

function Divider({ variant = "secondary", my = "0.5rem", text, className = "" }) {
	return (
		<div
			data-text={text}
			style={{ "--my": my }}
			className={`divider divider--${variant}${className !== "" ? ` ${className}` : ""}`}
		></div>
	);
}

Divider.propTypes = {
	variant: PropTypes.oneOf(["primary", "secondary", "accent", "info", "success", "danger"]),
	my: PropTypes.string,
	text: PropTypes.string,
	className: PropTypes.string,
};

export default Divider;
