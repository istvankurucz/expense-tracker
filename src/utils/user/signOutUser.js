import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase/firebase";

export default async function signOutUser(navigate) {
	try {
		await signOut(auth);

		navigate("/");
	} catch (e) {
		console.log("Error signing out the user.", e);
	}
}
