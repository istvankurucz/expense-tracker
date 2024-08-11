import { useEffect, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { collection, doc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";

function useGroups(max = null) {
	const [{ user }] = useStateValue();
	const [groups, setGroups] = useState([]);
	const [groupLoading, setGroupsLoading] = useState(false);

	useEffect(() => {
		async function fetchGroups() {
			setGroupsLoading(true);

			try {
				const groupsRef = collection(db, "groups");
				const userRef = doc(db, "users", user.uid);

				let q;
				if (max != null) {
					q = query(
						groupsRef,
						where("members", "array-contains", userRef),
						orderBy("lastTransaction", "desc"),
						limit(max)
					);
				} else {
					q = query(
						groupsRef,
						where("members", "array-contains", userRef),
						orderBy("lastTransaction", "desc")
					);
				}
				const res = await getDocs(q);

				const data = res.docs.map((group) => ({
					id: group.id,
					...group.data(),
				}));
				setGroups(data);

				setGroupsLoading(false);
			} catch (e) {
				console.log("Error fething the groups.", e);
				setGroupsLoading(false);
			}
		}

		if (user == null) return;

		fetchGroups();
	}, [user, max]);

	return { groups, groupLoading };
}

export default useGroups;
