import PropTypes from "prop-types";
import ChartBar from "./ChartBar/ChartBar";
import ChartPie from "./ChartPie/ChartPie";
import "./Chart.css";

function Chart({
	type,
	justify = "center",
	size = "16rem",
	offset = "1.5rem",
	legend = [],
	children,
}) {
	return (
		<div
			style={{ "--justify": justify, "--size": size, "--offset": offset }}
			className={`chart chart--${type} scrollbar`}
		>
			<div className={`chart__container chart__container--${type}`}>{children}</div>

			{legend.length > 0 && (
				<ul className="chart__legend">
					{legend.map((item, i) => (
						<li key={i} className="chart__legend__item">
							<span
								style={{ "--color": item.color }}
								className="chart__legend__color"
							></span>
							<span className="chart__legend__text">{item.text}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

Chart.propTypes = {
	type: PropTypes.oneOf(["bar", "pie"]),
	justify: PropTypes.string,
	size: PropTypes.string,
	offset: PropTypes.string,
	legend: PropTypes.arrayOf(
		PropTypes.shape({ color: PropTypes.string.isRequired, text: PropTypes.string.isRequired })
	),
	children: PropTypes.node.isRequired,
};

Chart.Bar = ChartBar;
Chart.Pie = ChartPie;

export default Chart;
