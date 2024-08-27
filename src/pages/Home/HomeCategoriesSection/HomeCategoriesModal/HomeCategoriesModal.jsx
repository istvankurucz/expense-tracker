import { useMemo } from "react";
import PropTypes from "prop-types";
import Overlay from "../../../../components/layout/Overlay/Overlay";
import Modal from "../../../../components/layout/Modal/Modal";
import Button from "../../../../components/ui/Button/Button";
import Table from "../../../../components/layout/Table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HomeCategoriesModal.css";
import useSorting from "../../../../hooks/sorting/useSorting";
import { faCaretDown, faCaretUp, faSort } from "@fortawesome/free-solid-svg-icons";
import CategoryIcon from "../../../../components/ui/CategoryIcon/CategoryIcon";
import formatPrice from "../../../../utils/format/formatPrice";
import Spinner from "../../../../components/ui/Spinner/Spinner";
import sortByCategory from "../../../../utils/sorting/sortByCategory";
import sortByProperty from "../../../../utils/sorting/sortByProperty";

function HomeCategoriesModal({ transctions = [], loading, show, setShow }) {
	const { sorting, setSortingParams } = useSorting("amount");

	// Variables
	const categoriesData = useMemo(() => {
		const data = transctions.map((category) => {
			const sumOfCategory = category.reduce(
				(total, currentTransaction) => total + currentTransaction.amount,
				0
			);
			return { category: category[0].category, amount: sumOfCategory };
		});

		switch (sorting.property) {
			case "category":
				return data.toSorted(sortByCategory(sorting.asc));

			case "amount":
				return data.toSorted(sortByProperty(sorting.property, sorting.asc));

			default:
				return data;
		}
	}, [transctions, sorting]);

	// Functions
	function getThIcon(property) {
		if (property === sorting.property) {
			return <FontAwesomeIcon icon={sorting.asc ? faCaretUp : faCaretDown} />;
		} else {
			return <FontAwesomeIcon icon={faSort} className="table__th__icon--info" />;
		}
	}

	return (
		<Overlay show={show}>
			<Modal>
				<Modal.Header>
					<Modal.Title>Kategóriánkénti költések</Modal.Title>
					<Modal.Close onClick={() => setShow(false)} />
				</Modal.Header>

				<Modal.Body>
					{loading ? (
						<div className="homeCategoriesModal__table__loading">
							<Spinner variant="text" size="3rem" text="Táblázat betöltése" />
						</div>
					) : categoriesData.length === 0 ? (
						<div className="homeCategoriesModal__table__noData">Nincs adat.</div>
					) : (
						<Table sortable className="homeCategoriesModal__table">
							<thead>
								<tr>
									<th onClick={() => setSortingParams("category")}>
										<div className="table__th--sortable homeCategoriesModal__table__th--category">
											<span className="table__th__text">Kategória</span>
											{getThIcon("category")}
										</div>
									</th>
									<th onClick={() => setSortingParams("amount")}>
										<div className="table__th--sortable homeCategoriesModal__table__th--amount">
											<span className="table__th__text">Összeg</span>
											{getThIcon("amount")}
										</div>
									</th>
								</tr>
							</thead>

							<tbody>
								{categoriesData.map((category) => (
									<tr key={category.category.name}>
										<td>
											<div className="homeCategoriesModal__table__td--category">
												<CategoryIcon category={category.category} />
												{category.category.text}
											</div>
										</td>
										<td className="homeCategoriesModal__table__td--amount">
											{formatPrice(category.amount)}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Modal.Body>

				<Modal.Footer>
					<Button variant="info" outlined onClick={() => setShow(false)}>
						Bezár
					</Button>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

HomeCategoriesModal.propTypes = {
	transctions: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
};

export default HomeCategoriesModal;
