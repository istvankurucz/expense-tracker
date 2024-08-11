import AuthModal from "./AuthModal/AuthModal";
import AuthOverlay from "./AuthOverlay/AuthOverlay";
import AuthModalBody from "./AuthModal/AuthModalBody/AuthModalBody";
import AuthText from "./AuthText/AuthText";
import AuthLink from "./AuthLink/AuthLink";
import "./Auth.css";

function Auth() {
	return <></>;
}

Auth.Overlay = AuthOverlay;
Auth.Modal = AuthModal;
Auth.Modal.Body = AuthModalBody;
Auth.Text = AuthText;
Auth.Link = AuthLink;

export default Auth;
