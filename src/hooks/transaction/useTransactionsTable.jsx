import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSorting from "../sorting/useSorting";
import sortByProperty from "../../utils/sorting/sortByProperty";
import sortByCategory from "../../utils/sorting/sortByCategory";

function useTransactionsTable(transactions = []) {
	// States
	const [searchParams] = useSearchParams();
	const { sorting, setSortingParams } = useSorting();
	const [sorted, setSorted] = useState(transactions);

	// Functions
	const filterByCategories = useCallback(
		(transactions = []) => {
			const categories = JSON.parse(searchParams.get("categories"));
			if (categories == null) return transactions;

			return transactions.filter((transaction) => {
				const transactionCategory = categories.find(
					(category) => category.name === transaction.category.name
				);
				return transactionCategory.checked;
			});
		},
		[searchParams]
	);

	const filterByDate = useCallback(
		(transactions = []) => {
			let dateFrom = searchParams.get("dateFrom");
			let dateTo = searchParams.get("dateTo");

			if (dateFrom == null && dateTo == null) return transactions;
			if (dateFrom === "" && dateTo === "") return transactions;

			dateFrom = dateFrom === "" ? null : new Date(dateFrom);
			dateTo = dateTo === "" ? null : new Date(dateTo);

			if (dateFrom == null) {
				return transactions.filter((transaction) => transaction.date <= dateTo);
			}

			if (dateTo == null) {
				return transactions.filter((transaction) => transaction.date >= dateFrom);
			}

			return transactions.filter(
				(transaction) => transaction.date >= dateFrom && transaction.date <= dateTo
			);
		},
		[searchParams]
	);

	const filterByAmount = useCallback(
		(transactions = []) => {
			let amountFrom = searchParams.get("amountFrom");
			let amountTo = searchParams.get("amountTo");

			if (amountFrom == null && amountTo == null) return transactions;
			if (amountFrom === "" && amountTo === "") return transactions;

			amountFrom = amountFrom === "" ? null : parseFloat(amountFrom);
			amountTo = amountTo === "" ? null : parseFloat(amountTo);

			if (amountFrom == null) {
				return transactions.filter((transaction) => transaction.amount <= amountTo);
			}

			if (amountTo == null) {
				return transactions.filter((transaction) => transaction.amount >= amountFrom);
			}

			return transactions.filter(
				(transaction) => transaction.amount >= amountFrom && transaction.amount <= amountTo
			);
		},
		[searchParams]
	);

	const filterByName = useCallback(
		(transactions = []) => {
			const name = searchParams.get("name");

			if (name === null || name === "") return transactions;

			return transactions.filter((transaction) =>
				transaction.name.toLowerCase().includes(name.toLocaleLowerCase())
			);
		},
		[searchParams]
	);

	useEffect(() => {
		// Filter the transactions
		setSorted(filterByName(filterByAmount(filterByDate(filterByCategories(transactions)))));

		// Sort the transactions
		switch (sorting.property) {
			case "category":
				setSorted((transactions) => transactions.toSorted(sortByCategory(sorting.asc)));
				break;

			case "date":
			case "amount":
				setSorted((transactions) =>
					transactions.toSorted(sortByProperty(sorting.property, sorting.asc))
				);
				break;
		}
	}, [
		searchParams,
		transactions,
		sorting,
		filterByName,
		filterByAmount,
		filterByDate,
		filterByCategories,
	]);

	return { sortedTransactions: sorted, sorting, setSortingParams };
}

export default useTransactionsTable;
