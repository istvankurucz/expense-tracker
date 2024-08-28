import { useRef, useState } from "react";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase/firebase";
import { deleteUser, updatePassword, updateProfile } from "firebase/auth";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import Input from "../../../components/form/Input/Input";
import Page from "../../../components/layout/Page/Page";
import Section from "../../../components/layout/Section/Section";
import Alert from "../../../components/ui/Alert/Alert";
import Button from "../../../components/ui/Button/Button";
import P from "../../../components/ui/P/P";
import disableSubmitButton from "../../../utils/form/disableSubmitButton";
import enableSubmitButton from "../../../utils/form/enableSubmitButton";
import Spinner from "../../../components/ui/Spinner/Spinner";
import "./ProfileData.css";

function ProfileData() {
	// States
	const [{ user }, dispatch] = useStateValue();
	const [showDeleteAlert, setShowDeleteAlert] = useState(true);
	const [personalLoading, setPersonalLoading] = useState(false);
	const [passwordLoading, setPasswordLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const navigate = useNavigate();

	// Refs
	const nameRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const personalSubmitRef = useRef();
	const passwordSubmitRef = useRef();
	const deleteButtonRef = useRef();

	// Variables
	const maxWidth = "600px";

	// Functions
	function getErrorMessage(errorCode) {
		switch (errorCode) {
			case "name-is-empty":
				return { type: "error", message: "A név mező nem lehet üres.", details: "" };

			case "name-is-the-same":
				return { type: "success", message: "Sikeres mentés", details: "" };

			case "password-too-short":
				return {
					type: "error",
					message: "A jelszónak legalább 6 karakternek kell lennie.",
					details: "",
				};

			case "Firebase: Error (auth/requires-recent-login).":
				return {
					type: "error",
					message:
						"A jelszavad megváltoztatásához biztonsági okokból először jelentkezz ki majd jelentkezz be.",
					details: "",
				};

			case "passwords-dont-match":
				return { type: "error", message: "A jelszavak nem egyeznek.", details: "" };

			default:
				return { message: "", details: "" };
		}
	}

	async function savePersonal(e) {
		e.preventDefault();

		// Disable submit button
		disableSubmitButton(personalSubmitRef, setPersonalLoading);

		// Get the name value
		const name = nameRef.current.value;

		try {
			// Check if the name is not empty
			if (name === "") throw new Error("name-is-empty");

			// Check if the name is different from the current
			if (name === user.displayName) throw new Error("name-is-the-same");

			// Update the name in Firestore
			const userRef = doc(db, "users", user.uid);
			await updateDoc(userRef, {
				name,
			});

			// Update the name is Auth
			await updateProfile(auth.currentUser, {
				displayName: name,
			});

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

			// Enable submit button
			enableSubmitButton(personalSubmitRef, setPersonalLoading);
		} catch (e) {
			console.log("Error updating the name of the user.", e);

			const { type, message, details } = getErrorMessage(e.message);
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type,
					message,
					details,
				},
			});

			// Enable submit button
			enableSubmitButton(personalSubmitRef, setPersonalLoading);
		}
	}

	async function savePassword(e) {
		e.preventDefault();

		// Disable submit button
		disableSubmitButton(passwordSubmitRef, setPasswordLoading);

		// Get the passwords
		const password = passwordRef.current.value;
		const passwordConfirm = passwordConfirmRef.current.value;

		try {
			// Check if the password is at least 6 characters long
			if (password.length < 6 || passwordConfirm.length < 6)
				throw new Error("password-too-short");

			// Check if the passwords are the same
			if (password !== passwordConfirm) throw new Error("passwords-dont-match");

			// Save the new password
			await updatePassword(auth.currentUser, password);

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

			// Enable submit button
			enableSubmitButton(passwordSubmitRef, setPasswordLoading);
		} catch (e) {
			console.log("Error updating the password of the user.", e.message);

			const { message, details } = getErrorMessage(e.message);
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message,
					details,
				},
			});

			// Enable submit button
			enableSubmitButton(passwordSubmitRef, setPasswordLoading);
		}
	}

	async function deleteProfile() {
		// Show confirm panel
		const confirm = window.confirm("Biztosan törlöd a profilod?");
		if (!confirm) return;

		// Disable delete button
		disableSubmitButton(deleteButtonRef, setDeleteLoading);

		try {
			// Delete the data of the user in Firestore
			const userRef = doc(db, "users", user.uid);
			await deleteDoc(userRef);

			// Delete the user from Auth
			await deleteUser(auth.currentUser);

			// Show feedback
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "A profilod sikeresen törölve lett.",
					details: "",
				},
			});

			// Enable delete button
			enableSubmitButton(deleteButtonRef, setDeleteLoading);

			// Navigate to home page
			navigate("/");
		} catch (e) {
			console.log("Error deleting the profile of the user.".e);

			const { message, details } = getErrorMessage(e.message);
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message,
					details,
				},
			});

			// Enable delete button
			enableSubmitButton(deleteButtonRef, setDeleteLoading);
		}
	}

	return (
		<>
			<Section id="profileDataTitle">
				<Page.Title>Adataim</Page.Title>
			</Section>

			<Section maxWidth={maxWidth} id="profileDataPersonal" className="profileData__section">
				<Section.Title>Személyes adatok</Section.Title>

				<form onSubmit={savePersonal} className="profileData__form">
					<div className="profileData__form__inputs">
						<Input
							type="text"
							label="Név"
							placeholder="Név"
							id="profileDataName"
							fullW
							defaultValue={user?.displayName}
							required
							ref={nameRef}
						/>
					</div>

					<Button type="submit" className="profileData__form__submit" ref={personalSubmitRef}>
						{personalLoading ? <Spinner variant="primary" text="Mentés" /> : "Mentés"}
					</Button>
				</form>
			</Section>

			<Section maxWidth={maxWidth} id="profileDataPassword" className="profileData__section">
				<Section.Title>Jelszó megváltoztatása</Section.Title>

				<form onSubmit={savePassword} className="profileData__form">
					<div className="profileData__form__inputs">
						<Input
							type="password"
							label="Új jelszó"
							placeholder="Új jelszó"
							id="profileDataPassword"
							fullW
							required
							ref={passwordRef}
						/>
						<Input
							type="password"
							label="Új jelszó megerősítése"
							placeholder="Új jelszó megerősítése"
							id="profileDataPasswordConfirm"
							fullW
							required
							ref={passwordConfirmRef}
						/>
					</div>

					<Button type="submit" className="profileData__form__submit" ref={passwordSubmitRef}>
						{passwordLoading ? <Spinner variant="primary" text="Mentés" /> : "Mentés"}
					</Button>
				</form>
			</Section>

			<Section maxWidth={maxWidth} id="profileDataDelete" className="profileData__section">
				<Section.Title>Profil törlése</Section.Title>

				<Alert
					show={showDeleteAlert}
					setShow={setShowDeleteAlert}
					icon={faExclamation}
					className="profileData__alert"
				>
					<P>
						A profilod törlésével minden adatod el fog veszni és azokat a későbbiekben már nem
						tudod visszaállítani.
					</P>
				</Alert>

				<Button variant="danger" outlined onClick={deleteProfile} ref={deleteButtonRef}>
					{deleteLoading ? (
						<Spinner variant="danger" text="Profil törlése" />
					) : (
						"Profil törlése"
					)}
				</Button>
			</Section>
		</>
	);
}

export default ProfileData;
