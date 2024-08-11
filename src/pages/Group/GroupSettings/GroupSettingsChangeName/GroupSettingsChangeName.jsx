import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useGroupContext } from "../../../../contexts/group/GroupContext";
import Overlay from "../../../../components/layout/Overlay/Overlay";
import Modal from "../../../../components/layout/Modal/Modal";
import Button from "../../../../components/ui/Button/Button";
import Spinner from "../../../../components/ui/Spinner/Spinner";
import P from "../../../../components/ui/P/P";
import Input from "../../../../components/form/Input/Input";
import "./GroupSettingsChangeName.css";
import disableSubmitButton from "../../../../utils/form/disableSubmitButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase/firebase";
import { useStateValue } from "../../../../contexts/Context API/StateProvider";
import enableSubmitButton from "../../../../utils/form/enableSubmitButton";

function GroupSettingsChangeName({ show, setShow }) {
	// States
	const [, dispatch] = useStateValue();
	const { group } = useGroupContext();
	const [loading, setLoading] = useState(false);

	// Refs
	const nameRef = useRef();
	const submitButtonRef = useRef();

	// Functions
	async function changeName(e) {
		e.preventDefault();

		// 1. Disable submit button
		disableSubmitButton(submitButtonRef, setLoading);

		// 2. Get form data
		const name = nameRef.current.value;

		try {
			// 3. Update the name of the group in Firestore
			const groupRef = doc(db, "groups", group.id);
			await updateDoc(groupRef, {
				name,
			});

			// 4. Show feedback
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Sikeres mentés.",
					details: "",
				},
			});

			// 5. Enable submit button
			enableSubmitButton(submitButtonRef, setLoading);

			// 6. Hide the modal
			setShow(false);
		} catch (e) {
			console.log("Error updating the name of the group.", e);
		}
	}

	return (
		<Overlay show={show}>
			<Modal>
				<Modal.Header>
					<Modal.Title>Csoport nevének megváltoztatása</Modal.Title>
					<Modal.Close onClick={() => setShow(false)} />
				</Modal.Header>

				<form onSubmit={changeName}>
					<Modal.Body>
						<P variant="info">Add meg a csoport új nevét.</P>

						<Input
							id="groupSettingsChangeName"
							label="Csoport neve"
							placeholder="Csoport neve"
							defaultValue={group?.name}
							fullW
							required
							ref={nameRef}
						/>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="info" outlined onClick={() => setShow(false)}>
							Mégse
						</Button>
						<Button type="submit" variant="accent" ref={submitButtonRef}>
							{loading ? <Spinner variant="primary" text="Mentés" /> : "Mentés"}
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</Overlay>
	);
}

GroupSettingsChangeName.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
};

export default GroupSettingsChangeName;
