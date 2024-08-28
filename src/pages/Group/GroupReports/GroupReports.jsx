import { useMemo, useState } from "react";
import Page from "../../../components/layout/Page/Page";
import Section from "../../../components/layout/Section/Section";
import TabSelect from "../../../components/ui/TabSelect/TabSelect";
import "./GroupReports.css";
import reportTabSelectItems from "../../../assets/report/reporttabSelectItems";
import useTransactions from "../../../hooks/transaction/useTransactions";
import SectionSpinner from "../../../components/ui/Spinner/SectionSpinner/SectionSpinner";
import getGroupMembersBarChartData from "../../../utils/chart/getGroupMembersBarChartData";
import getReportDate from "../../../utils/report/getReportDate";
import groupTransactionsByTime from "../../../utils/report/groupTransactionsByTime";
import groupTransactions from "../../../utils/transaction/groupTransactions";
import getCategoryPieChartData from "../../../utils/chart/getCategoryPieChartData";
import getCategoryPieChartLegend from "../../../utils/chart/getCategoryPieChartLegend";
import Report from "../../../components/ui/Report/Report";

function GroupReports() {
	const { transactions, transactionsLoading } = useTransactions();
	const [index, setIndex] = useState(0);

	const reportsData = useMemo(() => {
		const groupedByTime = groupTransactionsByTime(transactions, index);

		const data = groupedByTime.map((group) => {
			// User's balance (bar) chart
			const balanceChartData = getGroupMembersBarChartData(group);

			// Categories (pie) chart
			const categorizedTransactions = groupTransactions(group);
			const categoriesChartData = getCategoryPieChartData(categorizedTransactions);
			const categoriesChartLegend = getCategoryPieChartLegend(categorizedTransactions);

			return {
				date: getReportDate(group[0].date, index),
				balanceChart: {
					data: balanceChartData,
				},
				categoriesChart: {
					data: categoriesChartData,
					legend: categoriesChartLegend,
				},
			};
		});

		return data;
	}, [transactions, index]);

	// console.log("reports: ", reportsData);

	return (
		<>
			<Section id="groupReportsTitle">
				<Page.Title>Jelentések</Page.Title>
			</Section>

			<Section id="groupReportsList">
				<Section.Title>{reportTabSelectItems[index].text} jelentések</Section.Title>

				<TabSelect
					index={index}
					setIndex={setIndex}
					items={reportTabSelectItems.map((item) => item.text)}
				/>

				{transactionsLoading ? (
					<SectionSpinner text="Jelentések betöltése" />
				) : (
					<div className="groupReports__container">
						{reportsData.map((report, i) => (
							<Report
								key={i}
								type="group"
								date={report.date}
								balanceChart={report.balanceChart}
								categoriesChart={report.categoriesChart}
							/>
						))}
					</div>
				)}
			</Section>
		</>
	);
}

export default GroupReports;
