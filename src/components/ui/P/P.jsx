import PropTypes from "prop-types";
import "./P.css";

function P({ variant = "text", className = "", children }) {
	return <p className={`p p--${variant}${className !== "" ? ` ${className}` : ""}`}>{children}</p>;
}

P.propTypes = {
	variant: PropTypes.oneOf(["text", "info", "accent", "success", "danger"]),
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export default P;
