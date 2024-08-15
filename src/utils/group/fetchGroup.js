import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";

export default async function fetchGroup(groupId = "") {
	if (groupId === "") return;

	try {
		const groupRef = doc(db, "groups", groupId);
		const group = await getDoc(groupRef);
		return { id: group.id, name: group.data().name };
	} catch (e) {
		console.log("Error fetching the group.", e);
	}
}
