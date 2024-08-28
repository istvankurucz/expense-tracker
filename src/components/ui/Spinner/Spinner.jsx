import PropTypes from "prop-types";
import "./Spinner.css";

function Spinner({ size = "1rem", variant = "accent", text = "", centered, className }) {
	return (
		<div
			className={`spinner spinner--${variant}${centered ? " spinner--centered" : ""}${
				className ? ` ${className}` : ""
			}`}
		>
			<span style={{ "--size": size }} className="spinner__shape"></span>
			{text !== "" && <span className="spinner__text">{text}</span>}
		</div>
	);
}

Spinner.propTypes = {
	size: PropTypes.string,
	variant: PropTypes.oneOf([
		"primary",
		"secondary",
		"info",
		"accent",
		"text",
		"success",
		"danger",
	]),
	text: PropTypes.string,
	centered: PropTypes.bool,
	className: PropTypes.string,
};

export default Spinner;
