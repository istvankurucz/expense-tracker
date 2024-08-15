import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/ui/Button/Button";
import { useState } from "react";
import Dropdown from "../../../components/ui/Dropdown/Dropdown";
import Checkbox from "../../../components/form/Checkbox/Checkbox";
import "./TransactionsColumns.css";

function TransactionsColumns({ visibleCols = [], setVisibleCols }) {
	// States
	const [showList, setShowList] = useState(false);

	// Functions
	function setVisibility(optionName) {
		setVisibleCols((cols) =>
			cols.map((col) => {
				if (col.name === optionName) return { ...col, visible: !col.visible };
				return col;
			})
		);
	}

	return (
		<Dropdown>
			<Button variant="secondary" round onClick={() => setShowList((show) => !show)}>
				<FontAwesomeIcon icon={faChartSimple} />
				Oszlopok
			</Button>

			<Dropdown.List show={showList} setShow={setShowList}>
				{visibleCols.map((option) => (
					<Dropdown.List.Item key={option.name}>
						<Checkbox
							label={option.text}
							id={`transactionsColumns-${option.name}`}
							checked={option.visible}
							onChange={() => setVisibility(option.name)}
						/>
					</Dropdown.List.Item>
				))}
			</Dropdown.List>
		</Dropdown>
	);
}

TransactionsColumns.propTypes = {
	options: PropTypes.array.isRequired,
	visibleCols: PropTypes.array.isRequired,
	setVisibleCols: PropTypes.func.isRequired,
};

export default TransactionsColumns;
