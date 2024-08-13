import PropTypes from "prop-types";
import Section from "../../../../components/layout/Section/Section";
import Chart from "../../../../components/ui/Chart/Chart";
import formatPrice from "../../../../utils/format/formatPrice";
import "./GroupOverviewBalanceSection.css";

function GroupOverviewBalanceSection({ transactions = [], loading }) {
	// Variables
	const chartData = transactions.length === 0 ? [] : getChartData(transactions);

	// Functions
	function groupTransactionsByUser(transactions = []) {
		const orderedTransactionsObject = Object.groupBy(
			transactions,
			(transaction) => transaction.user.id
		);

		return Object.values(orderedTransactionsObject);
	}

	function calcGroupAmount(groups = []) {
		const groupAmounts = groups.map((userGroup) => {
			const sum = userGroup.reduce(
				(total, currentTransaction) => total + currentTransaction.amount,
				0
			);
			return { user: userGroup[0].user, amount: sum };
		});

		return groupAmounts.toSorted((a, b) => b.amount - a.amount);
	}

	function calcBarHeights(groups = []) {
		const maxAmount = groups[0].amount;

		const groupsWithHeights = groups.map((userGroup) => {
			const height = (userGroup.amount / maxAmount) * 100;
			return { ...userGroup, height };
		});

		return groupsWithHeights;
	}

	function getChartData(transactions = []) {
		const groupedTransactions = groupTransactionsByUser(transactions);
		const groupsWithAmount = calcGroupAmount(groupedTransactions);
		const groupsWithHeights = calcBarHeights(groupsWithAmount);

		const chartData = groupsWithHeights.map((userGroup, i) => ({
			height: userGroup.height,
			color: `var(--chart-color-${(i % 10) + 1})`,
			name: userGroup.user.name,
			value: formatPrice(userGroup.amount),
		}));

		return chartData;
	}

	return (
		<Section id="groupOverviewBalance">
			<Section.Title>Tagok egyenlege</Section.Title>

			{loading ? (
				<Chart.Loading />
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
