import PropTypes from "prop-types";
import "./ChartBar.css";

function ChartBar({ animate = true, color, width = "5rem", height, name, value }) {
	return (
		<div className={`chartBar${animate ? " chartBar--animate" : ""}`}>
			<div
				data-value={value}
				style={{ "--bar-width": width, "--bar-height": `${height}%`, "--color": color }}
				className="chartBar__bar"></div>
			<div className="chartBar__name">{name}</div>
		</div>
	);
}

ChartBar.propTypes = {
	animate: PropTypes.bool,
	color: PropTypes.string.isRequired,
	width: PropTypes.string,
	height: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};

export default ChartBar;
