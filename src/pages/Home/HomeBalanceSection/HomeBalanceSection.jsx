import PropTypes from "prop-types";
import Section from "../../../components/layout/Section/Section";
import Chart from "../../../components/ui/Chart/Chart";
import TabSelect from "../../../components/ui/TabSelect/TabSelect";
import useIncomeExpenseChart from "../../../hooks/chart/useIncomeExpenseChart";
import "./HomeBalanceSection.css";

const tabSelectItems = [
	{
		name: "thisMonth",
		text: "Hónap",
	},
	{
		name: "fromBeginning",
		text: "Kezdetektől",
	},
];

function HomeBalanceSection({ transactions = [], loading }) {
	// States
	const { index, setIndex, chartData } = useIncomeExpenseChart(transactions);

	return (
		<Section id="homeBalance">
			<Section.Title>Aktuális egyenleg</Section.Title>

			<TabSelect
				items={tabSelectItems.map((item) => item.text)}
				index={index}
				setIndex={setIndex}
			/>

			{loading ? (
				<Chart.Loading />
			) : (
				<Chart type="bar" justify="center">
					{chartData.map((bar) => (
						<Chart.Bar
							key={bar.name}
							width={bar.width}
							height={bar.height}
							color={bar.color}
							name={bar.text}
							value={bar.value}
						/>
					))}
				</Chart>
			)}
		</Section>
	);
}

HomeBalanceSection.propTypes = {
	transactions: PropTypes.array.isRequired,
	loading: PropTypes.bool,
};

export default HomeBalanceSection;
