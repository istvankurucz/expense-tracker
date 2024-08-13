import PropTypes from "prop-types";
import "./ChartPie.css";

function ChartPie({ color, fromDegree, degree, showCaption = true, name = "", value }) {
	return (
		<div
			style={{
				"--from-degree": `${fromDegree}deg`,
				"--degree": `${degree}deg`,
				"--color": color,
			}}
			className={`chartPie chartPie--${color}`}
		>
			{showCaption && (
				<div className="chartPie__info">
					{name !== "" && <div className="chartPie__name">{name}</div>}
					<div className="chartPie__name">{value}</div>
				</div>
			)}
		</div>
	);
}

ChartPie.propTypes = {
	color: PropTypes.string.isRequired,
	fromDegree: PropTypes.number.isRequired,
	degree: PropTypes.number.isRequired,
	showCaption: PropTypes.bool,
	name: PropTypes.string,
	value: PropTypes.string.isRequired,
};

export default ChartPie;
