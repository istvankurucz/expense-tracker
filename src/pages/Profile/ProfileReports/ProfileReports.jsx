import { useMemo, useState } from "react";
import Page from "../../../components/layout/Page/Page";
import Section from "../../../components/layout/Section/Section";
import TabSelect from "../../../components/ui/TabSelect/TabSelect";
import Report from "../../../components/ui/Report/Report";
import useTransactions from "../../../hooks/transaction/useTransactions";
import SectionSpinner from "../../../components/ui/Spinner/SectionSpinner/SectionSpinner";
import reportTabSelectItems from "../../../assets/report/reporttabSelectItems";
import getReportsData from "../../../utils/report/getUserReportsData";
import "./ProfileReports.css";

function ProfileReports() {
	const { transactions, transactionsLoading } = useTransactions();
	const [index, setIndex] = useState(0);

	const reportsData = useMemo(() => getReportsData(transactions, index), [transactions, index]);

	// console.log(reportsData);

	return (
		<>
			<Section id="profileReportsTitle">
				<Page.Title>Jelentéseim</Page.Title>
			</Section>

			<Section id="profileReportsList">
				<Section.Title>{reportTabSelectItems[index].text} jelentések</Section.Title>

				<TabSelect
					index={index}
					setIndex={setIndex}
					items={reportTabSelectItems.map((item) => item.text)}
				/>

				{transactionsLoading ? (
					<SectionSpinner text="Jelentések betöltése" />
				) : (
					<div className="profileReports__container">
						{reportsData.map((report, i) => (
							<Report
								key={i}
								type="user"
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

export default ProfileReports;
