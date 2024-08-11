import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../config/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import Input from "../../components/form/Input/Input";
import Auth from "../../components/layout/Auth/Auth";
import Modal from "../../components/layout/Modal/Modal";
import Button from "../../components/ui/Button/Button";
import Spinner from "../../components/ui/Spinner/Spinner";
import Checkbox from "../../components/form/Checkbox/Checkbox";
import disableSubmitButton from "../../utils/form/disableSubmitButton";
import enableSubmitButton from "../../utils/form/enableSubmitButton";
import "./SignUp.css";

function SignUp() {
	// States
	const [, dispatch] = useStateValue();
	const [loading, setLoading] = useState(false);

	// Refs
	const surnameRef = useRef();
	const firstnameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const submitButtonRef = useRef();

	const navigate = useNavigate();

	// Functions
	function validateFormData(password, passwordConfirm) {
		if (password !== passwordConfirm) {
			return {
				ok: false,
				code: "passwords-not-match",
			};
		}

		if (password.length < 6 || passwordConfirm.length < 6) {
			return {
				ok: false,
				code: "password-too-short",
			};
		}

		return {
			ok: true,
			code: "",
		};
	}

	async function createUserAuth(name, email, password) {
		try {
			// Create the user in Firebase Auth
			const { user } = await createUserWithEmailAndPassword(auth, email, password);

			// Update his name
			await updateProfile(user, {
				displayName: name,
			});

			return {
				ok: true,
				user,
			};
		} catch (e) {
			return {
				ok: false,
				error: e.code,
			};
		}
	}

	async function createUserDb(user) {
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

	function getErrorMessage(code) {
		switch (code) {
			case "passwords-not-match":
				return {
					message: "A jelszavak nem egyeznek.",
					details: "",
				};

			case "password-too-short":
				return {
					message: "A jelszó túl rövid.",
					details: "",
				};

			case "auth/email-already-in-use":
				return {
					message: "Az email cím már foglalt.",
					details: "Adj meg egy másikat.",
				};

			default:
				return {
					message: "Ismeretlen hiba történt.",
					details: "Próbáld meg később.",
				};
		}
	}

	async function signUpUser(e) {
		e.preventDefault();

		// 1. Disable submit button
		disableSubmitButton(submitButtonRef, setLoading);

		// 2. Get the data from form
		const surname = surnameRef.current.value;
		const firstname = firstnameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const passwordConfirm = passwordConfirmRef.current.value;
		const name = `${firstname} ${surname}`;

		// console.log({ name, email, password, passwordConfirm });

		// 3. Validate form data
		const { ok, code } = validateFormData(password, passwordConfirm);
		if (!ok) {
			const { message, details } = getErrorMessage(code);
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message,
					details,
				},
			});
			enableSubmitButton(submitButtonRef, setLoading);

			return;
		}

		try {
			// 4. Create the user in Firebase Auth
			const responseAuth = await createUserAuth(name, email, password);
			if (!responseAuth.ok) throw new Error(responseAuth.error);

			// 5. Create the user in Firestore
			const responseDb = await createUserDb(responseAuth.user);
			if (!responseDb.ok) throw new Error(responseDb.error);

			// 6. Enable submit button again
			enableSubmitButton(submitButtonRef, setLoading);

			// 7. Redirect the user to home page
			navigate("/");
		} catch (e) {
			console.log("Error signing up the user.", e);

			const { message, details } = getErrorMessage(e.message);
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message,
					details,
				},
			});

			// Enable submit button again
			enableSubmitButton(submitButtonRef, setLoading);
		}
	}

	return (
		<Auth.Overlay show={true} className="signup">
			<Auth.Modal>
				<Modal.Header>
					<Modal.Title>Regisztráció</Modal.Title>
				</Modal.Header>

				<form onSubmit={signUpUser}>
					<Auth.Modal.Body>
						<Input
							label="Vezetéknév"
							type="text"
							id="signupSurname"
							placeholder="Vezetéknév"
							required
							fullW
							ref={surnameRef}
						/>
						<Input
							label="Keresztnév"
							type="text"
							id="signupFirstname"
							placeholder="Keresztnév"
							required
							fullW
							ref={firstnameRef}
						/>
						<Input
							label="Email"
							type="email"
							id="signupEmail"
							placeholder="Email"
							required
							fullW
							ref={emailRef}
						/>
						<Input
							label="Jelszó"
							type="password"
							id="signupPassword"
							placeholder="Jelszó"
							required
							fullW
							ref={passwordRef}
						/>
						<Input
							label="Jelszó megerősítés"
							type="password"
							id="signupPasswordConfirm"
							placeholder="Jelszó megerősítés"
							required
							fullW
							ref={passwordConfirmRef}
						/>
						<Auth.Text>A jelszónak legalább 6 karakternek kell lennie.</Auth.Text>

						<Checkbox
							label="Elfogadom az Adatkezelési tájékoztatót."
							id="signupGDPR"
							required
						/>

						<Auth.Text type="action" centered>
							Már van fiókod?
							<Auth.Link to="/signin" replace>
								Bejelentkezés
							</Auth.Link>
						</Auth.Text>
					</Auth.Modal.Body>

					<Modal.Footer>
						<Button variant="info" outlined onClick={() => navigate(-1)}>
							Mégse
						</Button>
						<Button type="submit" ref={submitButtonRef}>
							{loading ? <Spinner variant="primary" text="Regisztráció" /> : "Regisztráció"}
						</Button>
					</Modal.Footer>
				</form>
			</Auth.Modal>
		</Auth.Overlay>
	);
}

export default SignUp;
