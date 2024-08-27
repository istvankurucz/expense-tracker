import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import Section from "../../../components/layout/Section/Section";
import Chart from "../../../components/ui/Chart/Chart";
import TabSelect from "../../../components/ui/TabSelect/TabSelect";
import useCategoriesChart from "../../../hooks/chart/useCategoriesChart";
import Button from "../../../components/ui/Button/Button";
import HomeCategoriesModal from "./HomeCategoriesModal/HomeCategoriesModal";
import "./HomeCategoriesSection.css";

const tabSelectItems = [
	{
		name: "expense",
		text: "Kiadás",
	},
	{
		name: "income",
		text: "Bevétel",
	},
];

function HomeCategoriesSection({ transactions = [], loading }) {
	const { index, setIndex, categorizedTransactions, chartData, chartLegend } =
		useCategoriesChart(transactions);
	const [showModal, setShowModal] = useState(false);

	return (
		<Section id="homeCategories">
			<HomeCategoriesModal
				transctions={categorizedTransactions}
				loading={loading}
				show={showModal}
				setShow={setShowModal}
			/>

			<Section.Title>Kategóriánkénti megoszlás</Section.Title>

			<TabSelect
				items={tabSelectItems.map((item) => item.text)}
				index={index}
				setIndex={setIndex}
			/>

			<div className="homeCategoriesSection__table">
				<Button variant="primary" round onClick={() => setShowModal(true)}>
					<FontAwesomeIcon icon={faTable} />
					Táblázat
				</Button>
			</div>

			{loading ? (
				<Chart.Loading />
			) : (
				<Chart type="pie" justify="center" size="16rem" legend={chartLegend}>
					{chartData.map((data, i) => (
						<Chart.Pie
							key={i}
							fromDegree={data.fromDegree}
							degree={data.degree}
							color={data.color}
							name=""
							value={data.value}
						/>
					))}
				</Chart>
			)}
		</Section>
	);
}

HomeCategoriesSection.propTypes = {
	transactions: PropTypes.array.isRequired,
	loading: PropTypes.bool,
};

export default HomeCategoriesSection;
