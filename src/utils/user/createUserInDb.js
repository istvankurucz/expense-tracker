import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";

export default async function createUserInDb(user) {
	try {
		const userRef = doc(db, "users", user.uid);
		await setDoc(userRef, {
			name: user.displayName,
		});

		return {
			ok: true,
		};
	} catch (e) {
		return {
			ok: false,
			error: e.code,
		};
	}
}
