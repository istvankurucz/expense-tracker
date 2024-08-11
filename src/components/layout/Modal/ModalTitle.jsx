import PropTypes from "prop-types";
import "./ModalTitle.css";

function ModalTitle({ className, children }) {
	return <h1 className={`modalTitle${className ? ` ${className}` : ""}`}>{children}</h1>;
}

ModalTitle.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default ModalTitle;
