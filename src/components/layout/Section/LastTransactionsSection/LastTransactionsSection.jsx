import PropTypes from "prop-types";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Section from "../Section";
import Transaction from "../../../ui/Transaction/Transaction";
import Spinner from "../../../ui/Spinner/Spinner";
import "./LastTransactionsSection.css";

function LastTransactionsSection({ type = "user", transactions = [], loading }) {
	return (
		<Section id="homeLastTransactions">
			<Section.Title className="home__transactions__title">
				Legutóbbi tranzakciók
				<Link to="/" className="home__transactions__title__link">
					Összes
				</Link>
			</Section.Title>

			{loading ? (
				<div className="lastTransactionSection__loading">
					<Spinner variant="text" size="3rem" text="Legutóbbi tranzakciók betöltése" />
				</div>
			) : (
				<div className="home__transactions__container">
					{transactions.slice(0, 5).map((transaction, i) => (
						<Fragment key={transaction.id}>
							<Transaction
								category={transaction.category}
								type={transaction.type}
								date={transaction.date.toLocaleDateString().replaceAll(" ", "")}
								group={transaction.group}
								user={transaction.user}
								name={transaction.name}
								amount={transaction.amount}
								comment={transaction.comment}
							/>
							{i !== transactions.length - 1 && (
								<hr className="home__transactions__divider" />
							)}
						</Fragment>
					))}
				</div>
			)}
		</Section>
	);
}

LastTransactionsSection.propTypes = {
	type: PropTypes.oneOf(["user", "group"]),
	transactions: PropTypes.array.isRequired,
	loading: PropTypes.bool,
};

export default LastTransactionsSection;
