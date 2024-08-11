import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useGroupContext } from "../../../../contexts/group/GroupContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase/firebase";
import { useStateValue } from "../../../../contexts/Context API/StateProvider";
import Overlay from "../../../../components/layout/Overlay/Overlay";
import Modal from "../../../../components/layout/Modal/Modal";
import Button from "../../../../components/ui/Button/Button";
import P from "../../../../components/ui/P/P";
import Select from "../../../../components/form/Select/Select";
import Spinner from "../../../../components/ui/Spinner/Spinner";
import enableSubmitButton from "../../../../utils/form/enableSubmitButton";
import disableSubmitButton from "../../../../utils/form/disableSubmitButton";
import "./GroupSettingsChangeAdmin.css";

function GroupSettingsChangeAdmin({ show, setShow }) {
	// States
	const [{ user }, dispatch] = useStateValue();
	const { group } = useGroupContext();
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	// Refs
	const submitButtonRef = useRef();

	// Variables
	const newAdminList = group?.roles.filter((role) => role.role !== "admin");

	// Functions
	function setNewRoles(roles = []) {
		const newRoles = roles.map((role) => {
			const memberRef = doc(db, "users", role.member.id);

			if (role.member.id === user.uid) {
				return { role: "member", member: memberRef };
			}
			if (role.member.id === newAdminList[index].member.id) {
				return { role: "admin", member: memberRef };
			}
			return { role: role.role, member: memberRef };
		});

		return newRoles;
	}

	async function changeAdmin(e) {
		e.preventDefault();

		// 1. Disable submit button
		disableSubmitButton(submitButtonRef, setLoading);

		// 2. Create the new roles
		const newRoles = setNewRoles(group.roles);
		console.log("New roles:", newRoles);

		try {
			// 3. Update the role in Firestore
			const groupRef = doc(db, "groups", group.id);
			await updateDoc(groupRef, {
				roles: newRoles,
			});

			// 4. Show feedback
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Sikeresen megváltoztattad a csoport adminját.",
					details: "",
				},
			});

			// 5. Enable submit button
			enableSubmitButton(submitButtonRef, setLoading);

			// 6. Hide the modal
			setShow(false);
		} catch (e) {
			console.log("Error updating the roles.", e);
		}
	}

	return (
		<Overlay show={show}>
			<Modal>
				<Modal.Header>
					<Modal.Title>Új admin megadása</Modal.Title>
					<Modal.Close onClick={() => setShow(false)} />
				</Modal.Header>

				<form onSubmit={changeAdmin}>
					<Modal.Body>
						<P variant="info">Válaszd ki a listából, hogy ki legyen az új admin.</P>

						<Select
							id="groupSettingsChangeAdminSelect"
							label="Csoport tagjai"
							items={newAdminList.map((role) => role.member.name)}
							index={index}
							setIndex={setIndex}
							required
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

GroupSettingsChangeAdmin.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
};

export default GroupSettingsChangeAdmin;
