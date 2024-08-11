import PropTypes from "prop-types";
import ModalBody from "./ModalBody";
import ModalClose from "./ModalClose";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import ModalTitle from "./ModalTitle";
import "./Modal.css";

function Modal({ className, children }) {
	return <div className={`modal${className ? ` ${className}` : ""}`}>{children}</div>;
}

Modal.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Close = ModalClose;

export default Modal;
