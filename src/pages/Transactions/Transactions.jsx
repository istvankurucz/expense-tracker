import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import UserLoadingFrame from "../../components/layout/LoadingFrame/UserLoadingFrame/UserLoadingFrame";
import Page from "../../components/layout/Page/Page";
import Section from "../../components/layout/Section/Section";
import TransactionsTable from "../../components/layout/TransactionsTable/TransactionsTable";
import useTransactions from "../../hooks/transaction/useTransactions";
import Button from "../../components/ui/Button/Button";
import Spinner from "../../components/ui/Spinner/Spinner";
import TransactionsColumns from "./TransactionsColumns/TransactionsColumns";
import TransactionsFilter from "./TransactionsFilter/TransactionsFilter";
import Input from "../../components/form/Input/Input";
import "./Transactions.css";

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
	const [visibleCols, setVisibleCols] = useState(cols);

	// console.log("Transactions:", transactions);

	return (
		<UserLoadingFrame>
			<Page className="transactions">
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
						/>

						<div className="transactions__settings__right">
							<Transactions.Filter />

							<Button variant="secondary" round title="Nézet">
								<FontAwesomeIcon icon={faTable} />
								<span className="transactions__settings__button__text">Nézet</span>
							</Button>

							<Transactions.Columns
								options={cols}
								visibleCols={visibleCols}
								setVisibleCols={setVisibleCols}
							/>
						</div>
					</div>
				</Section>

				<Section id="transactionsTable">
					<Section.Title>Tranzakciók</Section.Title>

					{transactionsLoading ? (
						<div className="transactions__table__loading">
							<Spinner variant="text" size="3rem" text="Tranzakciók betöltése" />
						</div>
					) : (
						<Transactions.Table
							cols={visibleCols}
							transactions={transactions}
							isGroupTransactions={isGroupTransactions}
						/>
					)}
				</Section>
			</Page>
		</UserLoadingFrame>
	);
}

Transactions.Filter = TransactionsFilter;
Transactions.Columns = TransactionsColumns;
Transactions.Table = TransactionsTable;

export default Transactions;
