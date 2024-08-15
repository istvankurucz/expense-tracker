import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserLoadingFrame from "../../components/layout/LoadingFrame/UserLoadingFrame/UserLoadingFrame";
import Page from "../../components/layout/Page/Page";
import Section from "../../components/layout/Section/Section";
import TransactionsTable from "../../components/layout/TransactionsTable/TransactionsTable";
import Button from "../../components/ui/Button/Button";
import useTransactions from "../../hooks/transaction/useTransactions";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/ui/Spinner/Spinner";
import TransactionsColumns from "./TransactionsColumns/TransactionsColumns";
import "./Transactions.css";
import { useState } from "react";
import Input from "../../components/form/Input/Input";

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

				<Section variant="secondary" id="transactionsButtons">
					<div className="transactions__table__buttons">
						<Input
							type="search"
							placeholder="Keresés..."
							id="transactionsSearch"
							round
							className="transactions__search"
						/>

						<div className="transactions__table__buttons__right">
							<Button variant="info" round>
								<FontAwesomeIcon icon={faFilter} />
								Szűrés
							</Button>

							<Transactions.Columns
								options={cols}
								visibleCols={visibleCols}
								setVisibleCols={setVisibleCols}
							/>

							<Button variant="secondary" round>
								<FontAwesomeIcon icon={faSort} />
								Rendezés
							</Button>
						</div>
					</div>
				</Section>

				<Section id="transactionsTable">
					{transactionsLoading ? (
						<div className="transactions__table__loading">
							<Spinner variant="text" size="3rem" text="Adatok betöltése" />
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

Transactions.Columns = TransactionsColumns;
Transactions.Table = TransactionsTable;

export default Transactions;
