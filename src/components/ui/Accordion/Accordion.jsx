import PropTypes from "prop-types";
import { useState } from "react";
import "./Accordion.css";

function Accordion({ header, content, className = "" }) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div
			className={`accordion${expanded ? " accordion--expanded" : ""}${
				className !== "" ? ` ${className}` : ""
			}`}
		>
			<div className="accordion__header" onClick={() => setExpanded((expanded) => !expanded)}>
				{header}
			</div>

			<div className="accordion__content">
				<div>{content}</div>
			</div>
		</div>
	);
}

Accordion.propTypes = {
	header: PropTypes.node.isRequired,
	content: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Accordion;
