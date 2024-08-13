import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../config/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { useGroupContext } from "../../../contexts/group/GroupContext";
import Page from "../../../components/layout/Page/Page";
import Section from "../../../components/layout/Section/Section";
import Button from "../../../components/ui/Button/Button";
import GroupSettingsChangeName from "./GroupSettingsChangeName/GroupSettingsChangeName";
import GroupSettingsMembers from "./GroupSettingsMembers/GroupSettingsMembers";
import GroupSettingsChangeAdmin from "./GroupSettingsChangeAdmin/GroupSettingsChangeAdmin";
import "./GroupSettings.css";
import generateJoinCode from "../../../utils/group/generateJoinCode";

function GroupSettings() {
	// States
	const [{ user }, dispatch] = useStateValue();
	const { group } = useGroupContext();
	const [showChangeNameModal, setShowChangeNameModal] = useState(false);
	const [showMembersModal, setShowMembersModal] = useState(false);
	const [showChangeAdminModal, setShowChangeAdminModal] = useState(false);
	const navigate = useNavigate();

	// Variables
	const admin = group?.roles.find((role) => role.role === "admin").member;

	// Functions
	async function generateNewJoinCode() {
		// 1. Ask the user
		const confirm = window.confirm("Biztosan megváltoztatod a belépési kódot?");
		if (!confirm) return;

		// 2. Generate new join code
		const newCode = generateJoinCode();

		try {
			// 3. Save the new code in Firestore
			const groupRef = doc(db, "groups", group.id);
			await updateDoc(groupRef, {
				joinCode: newCode,
			});

			// 4. Show feedback
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Belépési kód megváltoztatva.",
					details: "",
				},
			});
		} catch (e) {
			console.log("Error saving the new join code.", e);
		}
	}

	async function leaveGroup() {
		// 1. Show alert to user
		const confirm = window.confirm("Biztosan ki akarsz lépni a csoportból?");
		if (!confirm) return;

		// 2. Check if the user is the admin
		if (group.isAdmin) {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message: "Amíg te vagy a csoport adminja addig nem hagyhatod el a csoportot.",
					details: "Jelölj ki magad helyett valaki mást először.",
				},
			});
			return;
		}

		// 3. Remove the user from the group
		try {
			const groupRef = doc(db, "groups", group.id);
			const userRef = doc(db, "users", user.uid);
			await updateDoc(groupRef, {
				members: arrayRemove(userRef),
				roles: arrayRemove({ role: "member", member: userRef }),
			});

			// 4. Show feedback
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Sikeresen kiléptél a csoportból.",
					details: "",
				},
			});

			// 5. Navigate to Groups page
			navigate("/groups");
		} catch (e) {
			console.log("Error removing the user from the group.", e);
		}
	}

	return (
		<>
			{group?.isAdmin && (
				<GroupSettings.ChangeName show={showChangeNameModal} setShow={setShowChangeNameModal} />
			)}
			<GroupSettings.Members show={showMembersModal} setShow={setShowMembersModal} />
			{group?.isAdmin && (
				<GroupSettings.ChangeAdmin
					show={showChangeAdminModal}
					setShow={setShowChangeAdminModal}
				/>
			)}

			<Section id="groupSettingsTitle">
				<Page.Title>Beállítások</Page.Title>
			</Section>

			<Section id="groupSettingsData">
				<Section.Title>Csoport adatai</Section.Title>

				<div className="groupSettings__data">
					<div className="groupSettings__data__row">
						<span className="groupSetting__data__row__text">Csoport neve: </span>
						<span className="groupSetting__data__row__value">{group?.name}</span>
						{group?.isAdmin && (
							<button
								className="groupSettings__data__row__action"
								onClick={() => setShowChangeNameModal(true)}
							>
								Megváltoztatás
							</button>
						)}
					</div>
					<div className="groupSettings__data__row">
						<span className="groupSetting__data__row__text">Belépési kód: </span>
						<span className="groupSetting__data__row__value">#{group?.joinCode}</span>
						{group?.isAdmin && (
							<button
								className="groupSettings__data__row__action"
								onClick={generateNewJoinCode}
							>
								Megváltoztatás
							</button>
						)}
					</div>
					<div className="groupSettings__data__row">
						<span className="groupSetting__data__row__text">Tagok száma: </span>
						<span className="groupSetting__data__row__value">{group?.members.length}</span>
						<button
							className="groupSettings__data__row__action"
							onClick={() => setShowMembersModal(true)}
						>
							Megtekintés
						</button>
					</div>
					<div className="groupSettings__data__row">
						<span className="groupSetting__data__row__text">Admin: </span>
						<span className="groupSetting__data__row__value">{admin?.name}</span>
						{group?.isAdmin && (
							<button
								className="groupSettings__data__row__action"
								onClick={() => setShowChangeAdminModal(true)}
							>
								Megváltoztatás
							</button>
						)}
					</div>
				</div>
			</Section>

			<Section id="groupSettingsLeave">
				<Section.Title>Csoport elhagyása</Section.Title>

				<p className="groupSettings__p">
					Az alábbi gombra kattintva tudsz kilépni a csoportból.
				</p>
				<Button variant="danger" outlined onClick={leaveGroup}>
					Csoport elhagyása
				</Button>
			</Section>
		</>
	);
}

GroupSettings.ChangeName = GroupSettingsChangeName;
GroupSettings.Members = GroupSettingsMembers;
GroupSettings.ChangeAdmin = GroupSettingsChangeAdmin;

export default GroupSettings;
