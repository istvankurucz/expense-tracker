import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AccordionHeader.css";

function AccordionHeader({
	justify = "flex-start",
	icon,
	rotateIcon = true,
	className = "",
	children,
}) {
	return (
		<div
			style={{ "--justify-content": justify }}
			className={`accordionHeader${className !== "" ? ` ${className}` : ""}`}
		>
			<span className="accordionHeader__text">{children}</span>
			{icon !== null && (
				<FontAwesomeIcon
					icon={icon}
					className={`accordionHeader__icon${
						rotateIcon ? " accordionHeader__icon--rotate" : ""
					}`}
				/>
			)}
		</div>
	);
}

AccordionHeader.propTypes = {
	justify: PropTypes.string,
	icon: PropTypes.object,
	rotateIcon: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default AccordionHeader;
