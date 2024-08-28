import { useState } from "react";
import PropTypes from "prop-types";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import ShadowBox from "../../layout/ShadowBox/ShadowBox";
import Accordion from "../Accordion/Accordion";
import Chart from "../Chart/Chart";
import formatPrice from "../../../utils/format/formatPrice";
import Checkbox from "../../form/Checkbox/Checkbox";
import "./Report.css";

function Report({ type, date, balanceChart, categoriesChart }) {
	// States
	const [showAmounts, setShowAmounts] = useState(false);

	// Variables
	const balanceDiff =
		type === "user" ? balanceChart.data[0].value - balanceChart.data[1].value : 0;

	return (
		<ShadowBox className="report">
			<Accordion
				header={
					<Accordion.Header className="report__header" icon={faAngleDown}>
						{date}
					</Accordion.Header>
				}
			>
				<div className="report__body">
					<div className="report__section report__section--balance">
						<h4 className="report__section__title">Egyenleg</h4>

						<div className="report__section__chart">
							<Chart type="bar">
								{balanceChart?.data.map((bar) => (
									<Chart.Bar
										key={bar.name}
										width={bar.width}
										height={bar.height}
										color={bar.color}
										name={bar.text}
										value={formatPrice(bar.value)}
									/>
								))}
							</Chart>

							{type === "user" && (
								<div className="report__section__chart__diff">
									<span>Különbség</span>
									<span
										className={`report__section__chart__diff__value ${
											balanceDiff < 0
												? "report__section__chart__diff__value--danger"
												: "report__section__chart__diff__value--success"
										}`}
									>
										{formatPrice(balanceDiff)}
									</span>
								</div>
							)}
						</div>
					</div>
					<div className="report__section report__section--categories">
						<h4 className="report__section__title">Kategóriánkénti megoszlás</h4>

						<Checkbox
							label="Összegek mutatása"
							id={`reportShowAmount-${date}`}
							checked={showAmounts}
							onChange={(e) => setShowAmounts(e.target.checked)}
						/>

						<Chart type="pie" legend={categoriesChart.legend}>
							{categoriesChart?.data.map((pie, i) => (
								<Chart.Pie
									key={i}
									fromDegree={pie.fromDegree}
									degree={pie.degree}
									color={pie.color}
									name={showAmounts ? formatPrice(pie.name) : ""}
									value={pie.value}
								/>
							))}
						</Chart>
					</div>
					<div className="report__section report__section--differences">
						<h4 className="report__section__title">Változás az előző hónaphoz képest</h4>
					</div>
				</div>
			</Accordion>
		</ShadowBox>
	);
}

Report.propTypes = {
	type: PropTypes.oneOf(["user", "group"]),
	date: PropTypes.string.isRequired,
	balanceChart: PropTypes.object.isRequired,
	categoriesChart: PropTypes.object.isRequired,
};

export default Report;
