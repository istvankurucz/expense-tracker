import Page from "../../../components/layout/Page/Page";
import Section from "../../../components/layout/Section/Section";
import GroupOverviewBalanceSection from "./GroupOverviewBalanceSection/GroupOverviewBalanceSection";
import GroupOverviewCategoriesSection from "./GroupOverviewCategoriesSection/GroupOverviewCategoriesSection";
import LastTransactionsSection from "../../../components/layout/Section/LastTransactionsSection/LastTransactionsSection";
import useTransactions from "../../../hooks/transaction/useTransactions";
import "./GroupOverview.css";

function GroupOverview() {
	const { transactions, transactionsLoading } = useTransactions();

	return (
		<>
			<Section id="groupOverviewTitle">
				<Page.Title>Áttekintés</Page.Title>
			</Section>

			<GroupOverview.BalanceSection transactions={transactions} loading={transactionsLoading} />

			<GroupOverview.CategoriesSection
				transactions={transactions}
				loading={transactionsLoading}
			/>

			<LastTransactionsSection transactions={transactions} loading={transactionsLoading} />
		</>
	);
}

GroupOverview.BalanceSection = GroupOverviewBalanceSection;
GroupOverview.CategoriesSection = GroupOverviewCategoriesSection;

export default GroupOverview;
