import PropTypes from "prop-types";
import "./Container.css";

function Container({ maxWidth = "1200px", centered = true, className = "", children }) {
	return (
		<div
			style={{ "--max-width": maxWidth }}
			className={`container${centered ? " container--centered" : ""}${
				className !== "" ? ` ${className}` : ""
			}`}>
			{children}
		</div>
	);
}

Container.propTypes = {
	maxWidth: PropTypes.string,
	centered: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Container;
