import PropTypes from "prop-types";
import Spinner from "../Spinner";
import "./SectionSpinner.css";

function SectionSpinner({ text = "", className = "" }) {
	return (
		<div className={`sectionSpinner${className !== "" ? ` ${className}` : ""}`}>
			<Spinner variant="text" size="3rem" text={text} />
		</div>
	);
}

SectionSpinner.propTypes = {
	text: PropTypes.string,
	className: PropTypes.string,
};

export default SectionSpinner;
