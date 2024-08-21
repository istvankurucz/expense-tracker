import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { Timestamp, addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import SwitchSelect from "../../components/form/SwitchSelect/SwitchSelect";
import Page from "../../components/layout/Page/Page";
import Section from "../../components/layout/Section/Section";
import Input from "../../components/form/Input/Input";
import Textarea from "../../components/form/Textarea/Textarea";
import Button from "../../components/ui/Button/Button";
import CategorySelect from "../../components/form/Select/CategorySelect/CategorySelect";
import categories from "../../assets/categories";
import Select from "../../components/form/Select/Select";
import Spinner from "../../components/ui/Spinner/Spinner";
import disableSubmitButton from "../../utils/form/disableSubmitButton";
import enableSubmitButton from "../../utils/form/enableSubmitButton";
import UserLoadingFrame from "../../components/layout/LoadingFrame/UserLoadingFrame/UserLoadingFrame";
import FormButtons from "../../components/layout/FormButtons/FormButtons";
import useGroupSelect from "../../hooks/group/useGroupSelect";
import formatDate from "../../utils/format/formatDate";
import useTransaction from "../../hooks/transaction/useTransaction";
import AlertSection from "../../components/layout/Section/AlertSection/AlertSection";
import "./NewTransaction.css";

const typeSelectItems = [
	{
		type: "expense",
		text: "kiadás",
	},
	{
		type: "income",
		text: "bevétel",
	},
];

function NewTransaction({ edit = false }) {
	// States
	const [{ user }, dispatch] = useStateValue();
	const { transaction, transactionLoading } = useTransaction();
	const { groupSelectItems, index, setIndex } = useGroupSelect(transaction);
	const [typeIndex, setTypeIndex] = useState(0);
	const [categoryIndex, setCategoryIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState(formatDate());
	const [comment, setComment] = useState("");

	// Refs
	const submitButtonRef = useRef();

	const navigate = useNavigate();

	// Variables
	const maxWidth = "600px";
	const validCategories = categories.filter(
		(category) => category.type === typeSelectItems[typeIndex].type
	);

	// Functions
	function getTypeSelectItems() {
		if (transaction === null) return typeSelectItems.map((item) => item.text);
		return typeSelectItems
			.filter((item) => item.type === transaction.type)
			.map((item) => item.text);
	}

	function getFormData() {
		const type = typeSelectItems[typeIndex].type;
		const category = validCategories[categoryIndex].name;

		const groupId = groupSelectItems[index].id;
		const group = groupId === "no-group" || type === "income" ? null : doc(db, "groups", groupId);

		return {
			type,
			category,
			name,
			amount: parseFloat(amount),
			date: new Date(date),
			comment,
			group,
		};
	}

	async function saveTransaction(e) {
		e.preventDefault();

		// Disable submit button
		disableSubmitButton(submitButtonRef, setLoading);

		// 1. Get form data
		const formData = getFormData();

		try {
			// 2. Save the transaction
			if (edit) {
				// Update
				const transactionRef = doc(db, "transactions", transaction.id);
				await updateDoc(transactionRef, {
					group: formData.group,
					category: formData.category,
					name: formData.name,
					date: Timestamp.fromDate(formData.date),
					amount: formData.amount,
					comment: formData.comment,
				});
			} else {
				// Create
				const userRef = doc(db, "users", user.uid);
				const transactionsRef = collection(db, "transactions");
				await addDoc(transactionsRef, {
					group: formData.group,
					user: userRef,
					type: formData.type,
					category: formData.category,
					name: formData.name,
					date: Timestamp.fromDate(formData.date),
					amount: formData.amount,
					comment: formData.comment,
				});
			}

			// Enable submit button
			enableSubmitButton(submitButtonRef, setLoading);

			// Show feedback
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Sikeres mentés.",
					details: "",
				},
			});

			// Naviget to home page
			navigate("/");
		} catch (e) {
			console.log("Error saving the transaction.", e);

			enableSubmitButton(submitButtonRef, setLoading);
		}
	}

	// Set default values for the input fields if there is a transaction
	useEffect(() => {
		setTypeIndex(transaction === null ? 0 : transaction.type === "expense" ? 0 : 1);
		if (transaction === null) setCategoryIndex(0);
		else {
			const index = categories
				.filter((category) => category.type === transaction.type)
				.findIndex((category) => category.name === transaction.category.name);
			setCategoryIndex(index);
		}
		setName(transaction === null ? "" : transaction.name);
		setAmount(transaction === null ? "" : transaction.amount);
		setDate(transaction === null ? formatDate() : formatDate(transaction.date));
		setComment(transaction === null ? "" : transaction.comment);
	}, [transaction]);

	return (
		<UserLoadingFrame>
			<Page className="newTransaction">
				<Section maxWidth={maxWidth} id="newTransactionWelcome">
					<Page.Title className="newTransaction__title">
						{edit ? <>Tranzakció módosítása</> : <>Új {typeSelectItems[typeIndex].text}</>}
					</Page.Title>

					<SwitchSelect
						items={getTypeSelectItems()}
						index={transaction === null ? typeIndex : 0}
						setIndex={transaction === null ? setTypeIndex : () => {}}
						className="newTransaction__type__select"
					/>
				</Section>

				{edit && transactionLoading && (
					<Section
						maxWidth={maxWidth}
						id="newTransaction__loading"
						className="newTransaction__loading"
					>
						<Spinner variant="text" size="3rem" text="Tranzakció adatainak betöltése" />
					</Section>
				)}

				{edit && !transactionLoading && transaction === null && (
					<AlertSection id="newTransactionAccessDenied">
						<AlertSection.Icon icon={faBan} />

						<AlertSection.Text>
							<p>A tranzakcióhoz nincs hozzáférésed.</p>
						</AlertSection.Text>

						<AlertSection.Button link="/transactions">Trazakcióim</AlertSection.Button>
					</AlertSection>
				)}

				{(!edit || transaction !== null) && (
					<form onSubmit={saveTransaction}>
						<Section maxWidth={maxWidth} id="newTransactionData">
							<Section.Title>Adatok</Section.Title>

							<div className="newTransaction__inputs">
								<CategorySelect
									id="newTransactionCategory"
									items={validCategories}
									label="Kategória"
									index={categoryIndex <= validCategories.length ? categoryIndex : 0}
									setIndex={setCategoryIndex}
								/>
								<Input
									label="Megnevezés"
									type="text"
									placeholder="Pl. Lidl bevásárlás"
									id="newTransactionName"
									fullW
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<Input
									label="Összeg"
									type="number"
									placeholder="Ft"
									min={0}
									id="newTransactionAmount"
									fullW
									required
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
								<Input
									label="Dátum"
									type="date"
									id="newTransactionDate"
									value={date}
									onChange={(e) => setDate(e.target.value)}
									fullW
									required
								/>

								<Textarea
									label="Megjegyzés"
									id="newTransactionComment"
									placeholder="Bármilyen gondolat, amit fontos feljegyezni"
									rows={3}
									fullW
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
							</div>
						</Section>

						{typeIndex === 0 && (
							<Section
								maxWidth={maxWidth}
								variant="secondary"
								id="newTransactionSelectGroup"
							>
								<Section.Title>Csoport megadása</Section.Title>

								<Select
									label="Csoport"
									id="newTransactionGroup"
									items={groupSelectItems.map((item) => item.name)}
									index={index}
									setIndex={setIndex}
									required
								/>
							</Section>
						)}

						<Section maxWidth={maxWidth} id="newTransactionSubmit">
							<FormButtons>
								<Link to="/">
									<Button variant="info" outlined tabIndex={-1}>
										Mégse
									</Button>
								</Link>
								<Button type="submit" variant="accent" ref={submitButtonRef}>
									{loading ? <Spinner variant="primary" text="Mentés" /> : "Mentés"}
								</Button>
							</FormButtons>
						</Section>
					</form>
				)}
			</Page>
		</UserLoadingFrame>
	);
}

NewTransaction.propTypes = {
	edit: PropTypes.bool,
};

export default NewTransaction;
