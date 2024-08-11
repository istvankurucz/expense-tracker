import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase/firebase";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import Input from "../../components/form/Input/Input";
import Auth from "../../components/layout/Auth/Auth";
import Modal from "../../components/layout/Modal/Modal";
import Button from "../../components/ui/Button/Button";
import Spinner from "../../components/ui/Spinner/Spinner";
import disableSubmitButton from "../../utils/form/disableSubmitButton";
import enableSubmitButton from "../../utils/form/enableSubmitButton";
import "./PasswordReset.css";

function PasswordReset() {
	// States
	const [, dispatch] = useStateValue();
	const [loading, setLoading] = useState(false);

	// Refs
	const emailRef = useRef();
	const submitButtonRef = useRef();

	const navigate = useNavigate();

	// Functions
	async function sendPwResetEmail(e) {
		e.preventDefault();

		// 1. Disable submit button
		disableSubmitButton(submitButtonRef, setLoading);

		// 2. Get the email
		const email = emailRef.current.value;
		// console.log({ email });
		try {
			// 3. Send the password reset email
			await sendPasswordResetEmail(auth, email);

			// 4. Enable submit button
			enableSubmitButton(submitButtonRef, setLoading);

			// 5. Show feedback
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Email elküldve.",
					details: "",
				},
			});

			// 6. Navigate back to home page
			navigate("/");
		} catch (e) {
			console.log("Error sending the password reset email.", e);

			// Enable submit button
			enableSubmitButton(submitButtonRef, setLoading);
		}
	}

	return (
		<Auth.Overlay show>
			<Auth.Modal>
				<Modal.Header>
					<Modal.Title>Új jelszó</Modal.Title>
				</Modal.Header>

				<form onSubmit={sendPwResetEmail}>
					<Auth.Modal.Body>
						<Auth.Text>
							Az alábbi email címre fogjuk elküldeni a teendőket új jelszó beállításához.
						</Auth.Text>

						<Input
							label="Email"
							type="email"
							id="signupEmail"
							placeholder="Email"
							required
							fullW
							ref={emailRef}
						/>
					</Auth.Modal.Body>

					<Modal.Footer>
						<Button variant="info" outlined onClick={() => navigate(-1)}>
							Vissza
						</Button>
						<Button type="submit" ref={submitButtonRef}>
							{loading ? <Spinner variant="primary" text="Küldés" /> : "Küldés"}
						</Button>
					</Modal.Footer>
				</form>
			</Auth.Modal>
		</Auth.Overlay>
	);
}

export default PasswordReset;
