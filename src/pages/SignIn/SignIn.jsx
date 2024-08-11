import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import Auth from "../../components/layout/Auth/Auth";
import Modal from "../../components/layout/Modal/Modal";
import Input from "../../components/form/Input/Input";
import Button from "../../components/ui/Button/Button";
import Spinner from "../../components/ui/Spinner/Spinner";
import disableSubmitButton from "../../utils/form/disableSubmitButton";
import enableSubmitButton from "../../utils/form/enableSubmitButton";
import "./SignIn.css";

function SignIn() {
	// States
	const [, dispatch] = useStateValue();
	const [loading, setLoading] = useState(false);

	// Refs
	const emailRef = useRef();
	const passwordRef = useRef();
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
		disableSubmitButton(submitButtonRef, setLoading);

		// 2. Get form data
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		// console.log({ email, password });

		try {
			// 3. Sign in the user with Firebase auth
			await signInWithEmailAndPassword(auth, email, password);

			// 4. Enable submit button
			enableSubmitButton(submitButtonRef, setLoading);

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
			enableSubmitButton(submitButtonRef, setLoading);
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

						<hr className="signin__divider" />

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
							{loading ? (
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
