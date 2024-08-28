import PropTypes from "prop-types";
import Section from "../../../../components/layout/Section/Section";
import Chart from "../../../../components/ui/Chart/Chart";
import "./GroupOverviewBalanceSection.css";
import SectionSpinner from "../../../../components/ui/Spinner/SectionSpinner/SectionSpinner";
import getGroupMembersBarChartData from "../../../../utils/chart/getGroupMembersBarChartData";

function GroupOverviewBalanceSection({ transactions = [], loading }) {
	// Variables
	const chartData = transactions.length === 0 ? [] : getGroupMembersBarChartData(transactions);

	return (
		<Section id="groupOverviewBalance">
			<Section.Title>Tagok egyenlege</Section.Title>

			{loading ? (
				<SectionSpinner text="Grafikon betöltése" />
			) : (
				<Chart type="bar" justify={chartData.length < 4 ? "center" : "flex-start"}>
					{chartData.map((bar, i) => (
						<Chart.Bar
							key={i}
							height={bar.height}
							color={bar.color}
							name={bar.name}
							value={bar.value}
						/>
					))}
				</Chart>
			)}
		</Section>
	);
}

GroupOverviewBalanceSection.propTypes = {
	transactions: PropTypes.array.isRequired,
	loading: PropTypes.bool,
};

export default GroupOverviewBalanceSection;
