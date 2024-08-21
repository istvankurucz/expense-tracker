import { useMemo, useRef, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import UserLoadingFrame from "../../components/layout/LoadingFrame/UserLoadingFrame/UserLoadingFrame";
import Page from "../../components/layout/Page/Page";
import Section from "../../components/layout/Section/Section";
import TransactionsTable from "../../components/layout/TransactionsTable/TransactionsTable";
import useTransactions from "../../hooks/transaction/useTransactions";
import Spinner from "../../components/ui/Spinner/Spinner";
import TransactionsColumns from "./TransactionsColumns/TransactionsColumns";
import TransactionsFilter from "./TransactionsFilter/TransactionsFilter";
import Input from "../../components/form/Input/Input";
import TransactionsView from "./TransactionsView/TransactionsView";
import "./Transactions.css";
import Accordion from "../../components/ui/Accordion/Accordion";
import TransactionsAccordionHeader from "../../components/ui/Accordion/TransactionsAccordionHeader/TransactionsAccordionHeader";

const cols = [
	{
		name: "category",
		text: "Kategória",
		visible: true,
	},
	{
		name: "date",
		text: "Dátum",
		visible: true,
	},
	{
		name: "name",
		text: "Megnevezés",
		visible: true,
	},
	{
		name: "comment",
		text: "Megjegyzés",
		visible: false,
	},
	{
		name: "ref",
		text: "Csoport/tag",
		visible: false,
	},
	{
		name: "amount",
		text: "Összeg",
		visible: true,
	},
];

function Transactions() {
	// States
	const { transactions, transactionsLoading, isGroupTransactions } = useTransactions();
	const [view, setView] = useState("monthly");
	const [visibleCols, setVisibleCols] = useState(cols);
	const [, setSearchParams] = useSearchParams();

	// console.log("Transactions:", transactions);

	const monthlyTransactions = useMemo(() => {
		if (view === "table") return [];

		const groupedTransactions = Object.groupBy(
			transactions,
			(t) => `${t.date.getFullYear()}-${t.date.getMonth() + 1}`
		);
		return Object.values(groupedTransactions);
	}, [view, transactions]);

	// Refs
	const timeoutRef = useRef();

	// Functions
	function setSearchText(e) {
		clearTimeout(timeoutRef.current);

		// If the user does not type for 1 second then update the search params
		timeoutRef.current = setTimeout(() => {
			setSearchParams((params) => ({ ...params, name: e.target.value }));
		}, 750);
	}

	return (
		<UserLoadingFrame>
			<Page className="transactions">
				<Outlet />

				<Section id="transactionsTitle">
					<Page.Title>Tranzakciók</Page.Title>
				</Section>

				<Section variant="secondary" id="transactionsSettings">
					<Section.Title>Keresés és beállítások</Section.Title>

					<div className="transactions__settings">
						<Input
							type="search"
							placeholder="Keresés..."
							id="transactionsSearch"
							round
							className="transactions__search"
							onChange={setSearchText}
						/>

						<div className="transactions__settings__right">
							<Transactions.Filter />

							<Transactions.View view={view} setView={setView} />

							<Transactions.Columns
								options={cols}
								visibleCols={visibleCols}
								setVisibleCols={setVisibleCols}
							/>
						</div>
					</div>
				</Section>

				<Section id="transactionsTable">
					<Section.Title>
						{view === "table" ? <>Összes tranzakció</> : <>Tranzakciók havi bontásban</>}
					</Section.Title>

					<br />

					{transactionsLoading ? (
						<div className="transactions__table__loading">
							<Spinner variant="text" size="3rem" text="Tranzakciók betöltése" />
						</div>
					) : view === "table" ? (
						<Transactions.Table
							cols={visibleCols}
							transactions={transactions}
							isGroupTransactions={isGroupTransactions}
						/>
					) : (
						monthlyTransactions.map((transactionGroup, i) => (
							<Accordion
								header={
									<TransactionsAccordionHeader
										text={transactionGroup[0].date.toLocaleDateString().substring(0, 9)}
									/>
								}
								defaultExpanded={i === 0}
								className="transactions__accordion"
							>
								<Transactions.Table
									cols={visibleCols}
									transactions={transactionGroup}
									isGroupTransactions={isGroupTransactions}
								/>
							</Accordion>
						))
					)}
				</Section>
			</Page>
		</UserLoadingFrame>
	);
}

Transactions.Filter = TransactionsFilter;
Transactions.View = TransactionsView;
Transactions.Columns = TransactionsColumns;
Transactions.Table = TransactionsTable;

export default Transactions;
