import { Link, useNavigate } from "react-router-dom";
import FormButtons from "../../components/layout/FormButtons/FormButtons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import Page from "../../components/layout/Page/Page";
import Section from "../../components/layout/Section/Section";
import UserLoadingFrame from "../../components/layout/LoadingFrame/UserLoadingFrame/UserLoadingFrame";
import Button from "../../components/ui/Button/Button";
import Alert from "../../components/ui/Alert/Alert";
import Input from "../../components/form/Input/Input";
import Spinner from "../../components/ui/Spinner/Spinner";
import disableSubmitButton from "../../utils/form/disableSubmitButton";
import enableSubmitButton from "../../utils/form/enableSubmitButton";
import checkIfUserIsInGroup from "../../utils/group/checkIfUserIsInGroup";
import "./JoinGroup.css";

function JoinGroup() {
	// States
	const [{ user }, dispatch] = useStateValue();
	const [showAlert, setShowAlert] = useState(true);
	const [loading, setLoading] = useState(false);

	// Refs
	const codeRef = useRef();
	const submitButtonRef = useRef();

	const navigate = useNavigate();

	// Variables
	const maxWidth = "600px";

	// Functions
	function getErrorMessage(code) {
		switch (code) {
			case "group-does-not-exist":
				return {
					message: "A csoport nem létezik.",
					details: "Adj meg egy másik kódot.",
				};
		}
	}

	async function joinGroup(e) {
		e.preventDefault();

		// Disable submit button
		disableSubmitButton(submitButtonRef, setLoading);

		// Get form data
		const joinCode = codeRef.current.value;

		try {
			const groupsRef = collection(db, "groups");
			const q = query(groupsRef, where("joinCode", "==", joinCode));
			const res = await getDocs(q);

			if (res.empty) throw new Error("group-does-not-exist");

			const group = res.docs[0];
			if (checkIfUserIsInGroup(group.data().members, user.uid)) {
				// Enable submit button
				enableSubmitButton(submitButtonRef, setLoading);

				// Navigate to the page of the group
				navigate(`/groups/${group.id}`);

				return;
			}

			const groupRef = doc(db, "groups", group.id);
			const userRef = doc(db, "users", user.uid);
			await updateDoc(groupRef, {
				members: arrayUnion(userRef),
				roles: arrayUnion({ role: "member", member: userRef }),
			});

			// Enable submit button
			enableSubmitButton(submitButtonRef, setLoading);

			// Navigate to the page of the group
			navigate(`/groups/${group.id}`);
		} catch (e) {
			console.log("Error joining to group.", e);

			const { message, details } = getErrorMessage(e.message);
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					type: "error",
					show: true,
					message,
					details,
				},
			});

			// Enable submit button
			enableSubmitButton(submitButtonRef, setLoading);
		}
	}

	return (
		<UserLoadingFrame>
			<Page className="joinGroup">
				<Section maxWidth={maxWidth} id="joinGroupTitle">
					<Page.Title>Csatlakozás csoporthoz</Page.Title>
				</Section>

				<form onSubmit={joinGroup}>
					<Section maxWidth={maxWidth} id="joinGroupForm">
						<Section.Title>Belépési kód</Section.Title>

						<Alert
							show={showAlert}
							setShow={setShowAlert}
							icon={faInfo}
							className="joinGroup__alert">
							<p className="joinGroup__p">
								Add meg azt az egyedi kódot, amivel csatlakozni tudsz a csapathoz.
							</p>
							<p className="joinGroup__p">
								Ha nem tudod a kódot, akkor keresd fel a csoport adminisztrátorát.
							</p>
						</Alert>

						<div className="joinGroup__inputs">
							<Input
								type="text"
								id="joinGroupCode"
								label="Belépési kód"
								placeholder="Belépési kód"
								required
								fullW
								ref={codeRef}
							/>
						</div>
					</Section>

					<Section maxWidth={maxWidth} id="joinGroupSubmit">
						<FormButtons>
							<Link>
								<Button variant="info" outlined tabIndex={-1}>
									Mégse
								</Button>
							</Link>

							<Button type="submit" ref={submitButtonRef}>
								{loading ? <Spinner variant="primary" text="Csatlakozás" /> : "Csatlakozás"}
							</Button>
						</FormButtons>
					</Section>
				</form>
			</Page>
		</UserLoadingFrame>
	);
}

export default JoinGroup;
