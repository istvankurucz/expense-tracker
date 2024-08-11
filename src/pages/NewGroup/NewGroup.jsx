import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import Page from "../../components/layout/Page/Page";
import Section from "../../components/layout/Section/Section";
import UserLoadingFrame from "../../components/layout/LoadingFrame/UserLoadingFrame/UserLoadingFrame";
import Button from "../../components/ui/Button/Button";
import FormButtons from "../../components/layout/FormButtons/FormButtons";
import Input from "../../components/form/Input/Input";
import Alert from "../../components/ui/Alert/Alert";
import disableSubmitButton from "../../utils/form/disableSubmitButton";
import enableSubmitButton from "../../utils/form/enableSubmitButton";
import Spinner from "../../components/ui/Spinner/Spinner";
import generateJoinCode from "../../utils/group/generateJoinCode";
import "./NewGroup.css";

function NewGroup() {
	// States
	const [{ user }] = useStateValue();
	const [showOptions, setShowOptions] = useState(true);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	// Refs
	const nameRef = useRef();
	const submitButtonRef = useRef();

	// Variables
	const maxWidth = "600px";

	// Functions
	async function createGroup(e) {
		e.preventDefault();

		// Disable submit button
		disableSubmitButton(submitButtonRef, setLoading);

		// Get the form data
		const name = nameRef.current.value;

		try {
			// Add the group to Firestore
			const groupsRef = collection(db, "groups");
			const userRef = doc(db, "users", user.uid);
			const group = await addDoc(groupsRef, {
				name,
				members: [userRef],
				roles: [{ role: "admin", member: userRef }],
				joinCode: generateJoinCode(),
				lastTransaction: serverTimestamp(),
			});

			// Enable submit button
			enableSubmitButton(submitButtonRef, setLoading);

			// Navigate to the page of the group
			navigate(`/groups/${group.id}`);
		} catch (e) {
			console.log("Error creating the group.", e);

			// Enable submit button
			enableSubmitButton(submitButtonRef, setLoading);
		}
	}

	return (
		<UserLoadingFrame>
			<Page className="newGroup">
				<Section maxWidth={maxWidth} id="newGroupTitle">
					<Page.Title>Új csoport</Page.Title>
				</Section>

				<form onSubmit={createGroup}>
					<Section maxWidth={maxWidth} id="newGroupData">
						<Section.Title>Adatok</Section.Title>

						<Alert
							show={showOptions}
							setShow={setShowOptions}
							icon={faInfo}
							className="newGroup__data__alert">
							<p className="newGroup__data__p">
								A csoport létrehozásával te leszel a csoport adminisztrátora. Ezt a szerepet
								a későbbiekben bármikor módosíthatod a csoport beállításai menüpontban.
							</p>
							<p className="newGroup__data__p">
								Tagokat a létrehozást követően tudsz majd a csoporthoz adni.
							</p>
						</Alert>

						<div className="newGroup__inputs">
							<Input
								type="text"
								label="Csoport neve"
								placeholder="Csoport neve"
								id="newGroupName"
								required
								fullW
								ref={nameRef}
							/>
						</div>
					</Section>

					<Section maxWidth={maxWidth} id="newGroupSubmit">
						<FormButtons>
							<Link to="/">
								<Button variant="info" outlined tabIndex={-1}>
									Mégse
								</Button>
							</Link>
							<Button type="submit" ref={submitButtonRef}>
								{loading ? <Spinner variant="primary" text="Mentés" /> : "Mentés"}
							</Button>
						</FormButtons>
					</Section>
				</form>
			</Page>
		</UserLoadingFrame>
	);
}

export default NewGroup;
