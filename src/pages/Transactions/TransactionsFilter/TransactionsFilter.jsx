import { useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faX } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import Button from "../../../components/ui/Button/Button";
import Dropdown from "../../../components/ui/Dropdown/Dropdown";
import TransactionsFilterAccordion from "../../../components/ui/Accordion/TransactionsFilterAccordion/TransactionsFilterAccordion";
import categories from "../../../assets/categories";
import Checkbox from "../../../components/form/Checkbox/Checkbox";
import Input from "../../../components/form/Input/Input";
import Divider from "../../../components/ui/Divider/Divider";
import formatDate from "../../../utils/format/formatDate";
import "./TransactionsFilter.css";

function TransactionsFilter() {
	// States
	const [show, setShow] = useState(false);
	const [filterCount, setFilterCount] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();

	// Refs
	const categoriesListRef = useRef();
	const allCategoriesRef = useRef();
	const dateFromRef = useRef();
	const dateToRef = useRef();
	const amountFromRef = useRef();
	const amountToRef = useRef();

	// Set the filter count when the page finished loading
	useLayoutEffect(() => {
		updateFilterCount();
	}, []);

	// Functions
	function getAllCategoryCheckbox() {
		const checkboxes = categoriesListRef.current.querySelectorAll(".checkbox__input");
		return Array.from(checkboxes).slice(1);
	}

	function checkIfAllCategoriesAreChecked() {
		const checkboxes = getAllCategoryCheckbox();

		let isAllSelected = true;
		checkboxes.forEach((checkbox) => {
			if (!checkbox.checked) isAllSelected = false;
		});
		return isAllSelected;
	}

	function setAllCategories() {
		const checkboxes = getAllCategoryCheckbox();
		checkboxes.forEach((checkbox) => (checkbox.checked = allCategoriesRef.current.checked));
	}

	function checkIfAllCategoryIsSelected() {
		const categoriesInUrl = JSON.parse(searchParams.get("categories"));
		if (categoriesInUrl === null) return true;

		let isAllSelected = true;
		categoriesInUrl.forEach((category) => {
			if (!category.checked) isAllSelected = false;
		});
		return isAllSelected;
	}

	function checkIfCategoryIsChecked(categoryName) {
		const categoriesInUrl = JSON.parse(searchParams.get("categories"));
		if (categoriesInUrl === null) return true;

		const categoryInUrl = categoriesInUrl.find((category) => category.name === categoryName);
		return categoryInUrl.checked;
	}

	function setAllCategoriesCheckbox() {
		const isAllChecked = checkIfAllCategoriesAreChecked();
		allCategoriesRef.current.checked = isAllChecked;
	}

	function getDefaultDate(param) {
		const dateString = searchParams.get(param);
		if (dateString == null) return "";

		const date = new Date(dateString);
		return formatDate(date);
	}

	function getDefaultAmount(param) {
		const amountString = searchParams.get(param);
		if (amountString == null) return "";

		return amountString;
	}

	function getCategories() {
		const checkboxes = getAllCategoryCheckbox();

		return checkboxes.map((checkbox) => ({
			name: checkbox.getAttribute("id").split("-")[1],
			checked: checkbox.checked,
		}));
	}

	function updateFilterCount() {
		let newCount = 0;

		// Check if every category checkbox is checked
		if (!checkIfAllCategoriesAreChecked()) newCount++;

		// Check if at least 1 date is set
		if (dateFromRef.current.value !== "" || dateToRef.current.value !== "") newCount++;

		// Check if at least 1 amount is set
		if (amountFromRef.current.value !== "" || amountToRef.current.value !== "") newCount++;

		// Set the state
		setFilterCount(newCount);
	}

	function updateFilterParams() {
		// 1. Get the values
		const categories = getCategories();
		const dateFrom = dateFromRef.current.value;
		const dateTo = dateToRef.current.value;
		const amountFrom = amountFromRef.current.value;
		const amountTo = amountToRef.current.value;

		// 2. Set the search params
		setSearchParams({
			categories: JSON.stringify(categories),
			dateFrom,
			dateTo,
			amountFrom,
			amountTo,
		});

		// 3. Update the filter count
		updateFilterCount();

		// 4. Close the dropdown
		setShow(false);
	}

	function resetFilterParams() {
		setSearchParams({});
		setFilterCount(0);
		setShow(false);
	}

	return (
		<Dropdown>
			<Button variant="info" round title="Szűrés" onClick={() => setShow((show) => !show)}>
				<FontAwesomeIcon icon={faFilter} />
				<span className="transactions__settings__button__text">Szűrés</span>
				{filterCount > 0 && <span className="transacationsFilter__count">{filterCount}</span>}
			</Button>

			<Dropdown.List show={show} setShow={setShow} className="transactionsFilter__main">
				<TransactionsFilter.Accordion
					header={<TransactionsFilter.Accordion.Header text="Kategória" />}
					className="transactionsFilter__accordion"
				>
					<ul ref={categoriesListRef} className="transactionsFilter__categories scrollbar">
						<li>
							<Checkbox
								label="Összes kijelölése"
								id="transactionsFilterCategoriesAll"
								defaultChecked={checkIfAllCategoryIsSelected()}
								onChange={setAllCategories}
								ref={allCategoriesRef}
							/>
						</li>
						<Divider
							variant="info"
							my="0"
							className="transactionsFilter__categories__divider"
						/>
						{categories.map((category) => (
							<li key={category.name}>
								<Checkbox
									label={category.text}
									id={`transactionsFilterCategory-${category.name}`}
									defaultChecked={checkIfCategoryIsChecked(category.name)}
									onChange={setAllCategoriesCheckbox}
								/>
							</li>
						))}
					</ul>
				</TransactionsFilter.Accordion>

				<TransactionsFilter.Accordion
					header={<TransactionsFilter.Accordion.Header text="Dátum" />}
					className="transactionsFilter__accordion"
				>
					<div className="transactionsFilter__dates scrollbar">
						<Input
							type="date"
							label="Dátumtól"
							id="transactionsFilterDateFrom"
							fullW
							className="transactionsFilter__input"
							ref={dateFromRef}
							defaultValue={getDefaultDate("dateFrom")}
						/>
						<Input
							type="date"
							label="Dátumig"
							id="transactionsFilterDateTo"
							fullW
							className="transactionsFilter__input"
							ref={dateToRef}
							defaultValue={getDefaultDate("dateTo")}
						/>
					</div>
				</TransactionsFilter.Accordion>

				<TransactionsFilter.Accordion
					header={<TransactionsFilter.Accordion.Header text="Összeg" />}
				>
					<div className="transactionsFilter__amounts scrollbar">
						<Input
							type="number"
							label="Összegtől"
							placeholder="-tól"
							id="transactionsFilterAmountFrom"
							min={0}
							fullW
							className="transactionsFilter__input"
							ref={amountFromRef}
							defaultValue={getDefaultAmount("amountFrom")}
						/>
						<Input
							type="number"
							label="Összegig"
							placeholder="-ig"
							id="transactionsFilterAmountTo"
							fullW
							className="transactionsFilter__input"
							ref={amountToRef}
							defaultValue={getDefaultAmount("amountTo")}
						/>
					</div>
				</TransactionsFilter.Accordion>

				<div className="transactionsFilter__buttons">
					<Button variant="danger" outlined onClick={resetFilterParams}>
						<FontAwesomeIcon icon={faX} />
						Törlés
					</Button>
					<Button onClick={updateFilterParams}>Szűrés</Button>
				</div>
			</Dropdown.List>
		</Dropdown>
	);
}

TransactionsFilter.Accordion = TransactionsFilterAccordion;

export default TransactionsFilter;
