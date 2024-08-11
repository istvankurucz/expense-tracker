import { useEffect, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import checkIfUserIsInGroup from "../../utils/group/checkIfUserIsInGroup";
import checkIfAdmin from "../../utils/group/checkIfAdmin";

function useGroup() {
	// States
	const [{ user }] = useStateValue();
	const [group, setGroup] = useState(null);
	const [groupLoading, setGroupLoading] = useState(true);
	const { groupId } = useParams();

	useEffect(() => {
		async function fetchGroupMembersData(roles = []) {
			const membersData = roles.map(async (role) => {
				const memberRef = doc(db, role.member.path);
				const memberData = await getDoc(memberRef);
				return { role: role.role, member: { id: memberData.id, ...memberData.data() } };
			});

			return await Promise.all(membersData);
		}

		function fetchGroup() {
			const groupRef = doc(db, "groups", groupId);
			const unsub = onSnapshot(groupRef, async (group) => {
				setGroupLoading(true);

				// Check is th group exists
				if (!group.exists()) throw new Error("group-does-not-exist");

				// Check if the user is in the group
				if (!checkIfUserIsInGroup(group.data().members, user.uid)) {
					throw new Error("user-is-not-in-group");
				}

				// console.log("Roles:", group.data().roles);

				const data = {
					id: group.id,
					name: group.data().name,
					joinCode: group.data().joinCode,
					isAdmin: checkIfAdmin(group.data().roles, user.uid),
					roles: await fetchGroupMembersData(group.data().roles),
					members: group.data().members,
				};
				setGroup(data);

				setGroupLoading(false);
			});

			return unsub;
		}

		if (user == null || groupId == undefined) return;

		const unsub = fetchGroup();

		return unsub;
	}, [groupId, user]);

	return { group, groupLoading };
}

export default useGroup;
