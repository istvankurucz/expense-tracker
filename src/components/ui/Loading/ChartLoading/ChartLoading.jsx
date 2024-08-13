import PropTypes from "prop-types";
import Spinner from "../../Spinner/Spinner";
import "./ChartLoading.css";

function ChartLoading({ className = "" }) {
	return (
		<div className={`chartLoading${className !== "" ? ` ${className}` : ""}`}>
			<Spinner variant="text" size="3rem" text="Grafikon betöltése" />
		</div>
	);
}

ChartLoading.propTypes = {
	className: PropTypes.string,
};

export default ChartLoading;
