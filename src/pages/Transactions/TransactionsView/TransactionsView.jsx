import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/ui/Button/Button";
import Dropdown from "../../../components/ui/Dropdown/Dropdown";
import Radio from "../../../components/form/Radio/Radio";
import "./TransactionsView.css";

function TransactionsView({ view, setView }) {
	// States
	const [showList, setShowList] = useState(true);

	return (
		<Dropdown>
			<Button
				variant="secondary"
				round
				title="Nézet"
				onClick={() => setShowList((show) => !show)}
			>
				<FontAwesomeIcon icon={faTable} />
				<span className="transactions__settings__button__text">Nézet</span>
			</Button>

			<Dropdown.List show={showList} setShow={setShowList}>
				<Dropdown.List.Item>
					<Radio
						label="Havi bontás"
						name="transactionView"
						id="transactionsViewMonthly"
						checked={view === "monthly"}
						onChange={(e) => setView(e.target.checked ? "monthly" : "table")}
					/>
				</Dropdown.List.Item>
				<Dropdown.List.Item>
					<Radio
						label="Táblázat"
						name="transactionView"
						id="transactionsViewTable"
						checked={view === "table"}
						onChange={(e) => setView(!e.target.checked ? "monthly" : "table")}
					/>
				</Dropdown.List.Item>
			</Dropdown.List>
		</Dropdown>
	);
}

TransactionsView.propTypes = {
	view: PropTypes.string.isRequired,
	setView: PropTypes.func.isRequired,
};

export default TransactionsView;
