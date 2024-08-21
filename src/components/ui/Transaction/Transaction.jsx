import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import formatPrice from "../../../utils/format/formatPrice";
import Tooltip from "../Tooltip/Tooltip";
import getTransactionAmountSign from "../../../utils/transaction/getTransactionAmountSign";
import "./Transaction.css";

function Transaction({ category, type, date, group, user, name, amount, comment = "" }) {
	// States
	const [showComment, setShowComment] = useState(false);
	const { groupId } = useParams();

	// Variables
	const sign = getTransactionAmountSign(type);
	const hasGroupId = groupId != undefined;
	const showUser = hasGroupId;
	const showGroup = group != null || !hasGroupId;

	return (
		<div className={`transaction transaction--${type}`}>
			<CategoryIcon category={category} />

			<span className="transaction__date">{date}</span>

			<div className="transaction__body">
				<div className="transaction__body__top">
					{showGroup && (
						<Link to={`/groups/${group?.id}`} className="transaction__group">
							{group?.name}
						</Link>
					)}
					{showGroup && showUser && " - "}
					{showUser && <span className="transaction__user">{user.name}</span>}
				</div>

				<div className="transaction__name">
					<p className="transaction__name__text">{name}</p>

					{comment !== "" && (
						<div
							className="transaction__comment"
							onMouseEnter={() => setShowComment(true)}
							onMouseLeave={() => setShowComment(false)}
						>
							<FontAwesomeIcon icon={faComment} className="transaction__hasComment" />

							<Tooltip show={showComment} variant="dark">
								<p className="transaction__comment__text">{comment}</p>
							</Tooltip>
						</div>
					)}
				</div>
			</div>

			<div className="transaction__amount">
				{sign}
				{formatPrice(amount)}
			</div>
		</div>
	);
}

Transaction.propTypes = {
	category: PropTypes.object.isRequired,
	type: PropTypes.oneOf(["income", "expense"]),
	date: PropTypes.string.isRequired,
	group: PropTypes.oneOfType([PropTypes.object]),
	user: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	name: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	comment: PropTypes.string,
};

export default Transaction;
