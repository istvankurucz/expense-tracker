import { useRef, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Auth from "../../components/layout/Auth/Auth";
import Modal from "../../components/layout/Modal/Modal";
import Input from "../../components/form/Input/Input";
import Button from "../../components/ui/Button/Button";
import Spinner from "../../components/ui/Spinner/Spinner";
import disableSubmitButton from "../../utils/form/disableSubmitButton";
import enableSubmitButton from "../../utils/form/enableSubmitButton";
import Divider from "../../components/ui/Divider/Divider";
import createUserInDb from "../../utils/user/createUserInDb";
import checkIfNewUser from "../../utils/user/checkIfNewUser";
import "./SignIn.css";

function SignIn() {
	// States
	const [, dispatch] = useStateValue();
	const [googleLoading, setGoogleLoading] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);

	// Refs
	const emailRef = useRef();
	const passwordRef = useRef();
	const googleButtonRef = useRef();
	const submitButtonRef = useRef();

	const navigate = useNavigate();

	// Functions
	function getErrorMessage(code) {
		switch (code) {
			case "auth/invalid-credential":
				return {
					message: "A megadott email vagy jelszó nem megfelelő.",
					details: "",
				};

			default:
				return {
					message: "Ismeretlen hiba történt.",
					details: "Próbáld meg később.",
				};
		}
	}

	async function signInUser(e) {
		e.preventDefault();

		// 1. Disable submit button
		disableSubmitButton(submitButtonRef, setSubmitLoading);

		// 2. Get form data
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		// console.log({ email, password });

		try {
			// 3. Sign in the user with Firebase auth
			await signInWithEmailAndPassword(auth, email, password);

			// 4. Enable submit button
			enableSubmitButton(submitButtonRef, setSubmitLoading);

			// 5. Redirect to home page
			navigate("/");
		} catch (e) {
			console.log("Error signing in the user.", e);

			const { message, details } = getErrorMessage(e.code);
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message,
					details,
				},
			});

			// Enable submit button
			enableSubmitButton(submitButtonRef, setSubmitLoading);
		}
	}

	async function signInUserWithGoogle() {
		// Disable the Google button
		disableSubmitButton(googleButtonRef, setGoogleLoading);

		try {
			// Create the user in Firebase auth
			const { user } = await signInWithPopup(auth, googleProvider);

			// Check if the user is new
			if (checkIfNewUser(user)) {
				// Create the user in Firestore
				const responseDb = await createUserInDb(user);
				if (!responseDb.ok) throw new Error(responseDb.error);
			}

			// Enable Google button
			enableSubmitButton(googleButtonRef, setGoogleLoading);

			// Redirect to home page
			navigate("/");
		} catch (e) {
			console.log("Error signing in the user with Google.", e);

			// Enable Google button
			enableSubmitButton(googleButtonRef, setGoogleLoading);
		}
	}

	return (
		<Auth.Overlay show={true} className="signin">
			<Auth.Modal>
				<Modal.Header>
					<Modal.Title>Bejelentkezés</Modal.Title>
				</Modal.Header>

				<form onSubmit={signInUser}>
					<Auth.Modal.Body>
						<Input
							label="Email"
							type="email"
							id="signinEmail"
							placeholder="Email"
							required
							fullW
							ref={emailRef}
						/>
						<Input
							label="Jelszó"
							type="password"
							id="signinPassword"
							placeholder="Jelszó"
							required
							fullW
							ref={passwordRef}
						/>

						<Auth.Text type="action" centered>
							Elfelejtetted a jelszavad?
							<Auth.Link to="/password-reset">Új jelszó</Auth.Link>
						</Auth.Text>

						<Divider text="További lehetőségek" my="0.75rem" />

						{/* <Auth.Text centered>További lehetőségek</Auth.Text> */}
						<Button outlined centered onClick={signInUserWithGoogle} ref={googleButtonRef}>
							{googleLoading && <Spinner variant="primary" />}
							<FontAwesomeIcon icon={faGoogle} />
							Google
						</Button>

						{/* <hr className="signin__divider" /> */}
						<Divider my="0.25rem" />

						<Auth.Text centered>
							Még nincs fiókod?
							<Auth.Link to="/signup" replace>
								Regisztráció
							</Auth.Link>
						</Auth.Text>
					</Auth.Modal.Body>

					<Modal.Footer>
						<Button variant="info" outlined onClick={() => navigate(-1)}>
							Mégse
						</Button>
						<Button type="submit" ref={submitButtonRef}>
							{submitLoading ? (
								<Spinner variant="primary" text="Bejelentkezés" />
							) : (
								"Bejelentkezés"
							)}
						</Button>
					</Modal.Footer>
				</form>
			</Auth.Modal>
		</Auth.Overlay>
	);
}

export default SignIn;
