import PropTypes from "prop-types";
import { useState } from "react";
import "./Accordion.css";

function Accordion({ defaultExpanded = false, header, className = "", children }) {
	const [expanded, setExpanded] = useState(defaultExpanded);

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
				<div>{children}</div>
			</div>
		</div>
	);
}

Accordion.propTypes = {
	defaultExpanded: PropTypes.bool,
	header: PropTypes.node.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Accordion;
