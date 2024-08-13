import Section from "../../../components/layout/Section/Section";
import Chart from "../../../components/ui/Chart/Chart";
import TabSelect from "../../../components/ui/TabSelect/TabSelect";
import useCategoriesChart from "../../../hooks/chart/useCategoriesChart";
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
	const { index, setIndex, chartData, chartLegend } = useCategoriesChart(transactions);

	return (
		<Section id="homeCategories">
			<Section.Title>Kategóriánkénti megoszlás</Section.Title>

			<TabSelect
				items={tabSelectItems.map((item) => item.text)}
				index={index}
				setIndex={setIndex}
			/>

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

export default HomeCategoriesSection;
