import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import "./NewTransactionButton.css";

function NewTransactionButton({ className }) {
	const location = useLocation();

	// Variables
	const hasGroupParam = location.pathname.includes("/groups/");
	const groupId = location.pathname.split("/")[2];

	return (
		<Link
			to={`/new-transaction${hasGroupParam ? `?groupId=${groupId}` : ""}`}
			className={`newTransactionButton${className ? ` ${className}` : ""}`}
		>
			<Button icon round className="newTransactionButton__button">
				<FontAwesomeIcon icon={faPlus} />
			</Button>
		</Link>
	);
}

NewTransactionButton.propTypes = {
	className: PropTypes.string,
};

export default NewTransactionButton;
