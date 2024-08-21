import { Link } from "react-router-dom";
import Modal from "../../../components/layout/Modal/Modal";
import Overlay from "../../../components/layout/Overlay/Overlay";
import Button from "../../../components/ui/Button/Button";
import useTransaction from "../../../hooks/transaction/useTransaction";
import "./TransactionDetails.css";
import getTransactionAmountSign from "../../../utils/transaction/getTransactionAmountSign";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import P from "../../../components/ui/P/P";
import CategoryIcon from "../../../components/ui/CategoryIcon/CategoryIcon";
import formatPrice from "../../../utils/format/formatPrice";
import Divider from "../../../components/ui/Divider/Divider";

function TransactionDetails() {
	const { transaction, transactionLoading } = useTransaction();

	return (
		<Overlay show>
			<Modal>
				<Modal.Header>
					<Modal.Title>Részletek</Modal.Title>
					<Link to="/transactions">
						<Modal.Close tabIndex={-1} />
					</Link>
				</Modal.Header>

				<Modal.Body className="transactionDetails__body">
					{transactionLoading ? (
						<div className="transactionDetails__body__loading">
							<Spinner variant="text" size="3rem" text="Tranzakció betöltése" />
						</div>
					) : transaction === null ? (
						<div className="transactionDetails__body__noTransaction">
							<FontAwesomeIcon icon={faBan} />
							<P>A tranzakció nem található.</P>
						</div>
					) : (
						<>
							<div className="transactionDetails__body__main">
								<div className="transactionDetails__body__main__left">
									<div
										style={{
											"--color": transaction?.category.colors.text,
											"--bg-color": transaction?.category.colors.bg,
										}}
										className="transactionDetails__body__category"
									>
										<CategoryIcon
											category={transaction?.category}
											className="transactionDetails__body__category__icon"
										/>
										<span className="transactionDetails__body__category__text">
											{transaction?.category.text}
										</span>
									</div>
									<div className="transactionDetails__body__name">{transaction?.name}</div>
									<div className="transactionDetails__body__date">
										{transaction?.date.toLocaleDateString()}
									</div>
								</div>

								<div className="transactionDetails__body__main__right">
									<div className="transactionDetails__body__amount">
										<span className="transactionDetails__body__amount__text">Összeg</span>
										<span
											className={`transactionDetails__body__amount__value transactionDetails__body__amount__value--${transaction?.type}`}
										>
											{getTransactionAmountSign(transaction?.type)}
											{formatPrice(transaction?.amount)}
										</span>
									</div>
								</div>
							</div>

							<Divider my="1.5rem" />

							<div className="transactionDetails__body__main__details">
								{transaction?.type === "expense" && (
									<div className="transactionDetails__body__group">
										<span className="transactionDetails__body__group__text">
											Csoport:
										</span>
										{transaction?.group === null ? (
											<span className="transactionDetails__body__group__noGroup">
												Nincs csoport
											</span>
										) : (
											<Link
												to={`/groups/${transaction?.group.id}`}
												className="transactionDetails__body__group__value"
											>
												{transaction?.group.name}
											</Link>
										)}
									</div>
								)}

								<div className="transactionDetails__body__comment">
									<span className="transactionDetails__body__comment__text">
										Megjegyzés:
									</span>
									{transaction?.comment === "" ? (
										<span className="transactionDetails__body__comment__noComment">
											Nincs megjegyzés
										</span>
									) : (
										<span className="transactionDetails__body__comment__value">
											{transaction?.comment}
										</span>
									)}
								</div>
							</div>
						</>
					)}
				</Modal.Body>

				<Modal.Footer>
					<Link to="edit">
						<Button variant="accent" tabIndex={-1}>
							Szerkesztés
						</Button>
					</Link>
					<Link to="/transactions">
						<Button variant="info" outlined tabIndex={-1}>
							Bezár
						</Button>
					</Link>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

export default TransactionDetails;
