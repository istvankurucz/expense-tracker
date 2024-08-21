import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";

export default async function fetchGroup(group = null) {
	if (group === null) return null;

	try {
		const groupRef = doc(db, "groups", group.id);
		const res = await getDoc(groupRef);
		return { id: res.id, name: res.data().name };
	} catch (e) {
		console.log("Error fetching the group.", e);
	}
}
