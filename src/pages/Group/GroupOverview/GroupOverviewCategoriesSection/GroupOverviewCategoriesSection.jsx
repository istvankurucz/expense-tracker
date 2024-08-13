import PropTypes from "prop-types";
import Section from "../../../../components/layout/Section/Section";
import groupTransactions from "../../../../utils/transaction/groupTransactions";
import getCategoryPieChartData from "../../../../utils/chart/getCategoryPieChartData";
import getCategoryPieChartLegend from "../../../../utils/chart/getCategoryPieChartLegend";
import "./GroupOverviewCategoriesSection.css";
import Chart from "../../../../components/ui/Chart/Chart";

function GroupOverviewCategoriesSection({ transactions = [], loading }) {
	// Variables
	const groupedTransactions = groupTransactions(transactions, "category");
	const chartData = transactions.length === 0 ? [] : getCategoryPieChartData(groupedTransactions);
	const chartLegend = getCategoryPieChartLegend(groupedTransactions);

	// Functions

	return (
		<Section id="groupOverviewCategories">
			<Section.Title>Kategóriánkénti eloszlás</Section.Title>

			{loading ? (
				<Chart.Loading />
			) : (
				<Chart type="pie" legend={chartLegend}>
					{chartData.map((category, i) => (
						<Chart.Pie
							key={i}
							fromDegree={category.fromDegree}
							degree={category.degree}
							color={category.color}
							name=""
							value={category.value}
						/>
					))}
				</Chart>
			)}
		</Section>
	);
}

GroupOverviewCategoriesSection.propTypes = {
	transactions: PropTypes.array.isRequired,
	loading: PropTypes.bool,
};

export default GroupOverviewCategoriesSection;
