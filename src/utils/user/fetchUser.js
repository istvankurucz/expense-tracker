import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";

export default async function fetchUser(userId = "") {
	if (userId === "") return;

	try {
		const userRef = doc(db, "users", userId);
		const user = await getDoc(userRef);

		return { id: user.id, ...user.data() };
	} catch (e) {
		console.log("Error fetching the user.", e);
	}
}
