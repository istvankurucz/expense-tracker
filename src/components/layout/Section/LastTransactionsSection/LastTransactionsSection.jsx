import PropTypes from "prop-types";
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Section from "../Section";
import Transaction from "../../../ui/Transaction/Transaction";
import Divider from "../../../ui/Divider/Divider";
import SectionSpinner from "../../../ui/Spinner/SectionSpinner/SectionSpinner";
import "./LastTransactionsSection.css";

function LastTransactionsSection({ transactions = [], loading }) {
	const { groupId } = useParams();

	return (
		<Section id="lastTransactions">
			<Section.Title className="lastTransactions__title">
				Legutóbbi tranzakciók
				<Link
					to={`/transactions${groupId != undefined ? `?groupId=${groupId}` : ""}`}
					className="lastTransactions__title__link"
				>
					Összes
				</Link>
			</Section.Title>

			{loading ? (
				<SectionSpinner text="Legutóbbi tranzakciók betöltése" />
			) : (
				<div className="lastTransactions__container scrollbar">
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
							{i !== transactions.slice(0, 5).length - 1 && <Divider variant="info" />}
						</Fragment>
					))}
				</div>
			)}
		</Section>
	);
}

LastTransactionsSection.propTypes = {
	transactions: PropTypes.array.isRequired,
	loading: PropTypes.bool,
};

export default LastTransactionsSection;
