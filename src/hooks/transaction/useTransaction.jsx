import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase/firebase";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import getTransaction from "../../utils/transaction/getTransaction";

function useTransaction() {
	// States
	const [{ user }, dispatch] = useStateValue();
	const [transaction, setTranasction] = useState(null);
	const [loading, setLoading] = useState(true);
	const { transactionId } = useParams();

	// Functions
	function getErrorMessage(errorCode) {
		switch (errorCode) {
			case "transaction-not-found": {
				return { message: "A tranzakció nem található.", details: "" };
			}
			case "access-denied-to-transaction": {
				return { message: "Ehhez a tranzakcióhoz nincs hozzáférésed.", details: "" };
			}
		}
	}

	useEffect(() => {
		async function fetchTransaction() {
			setLoading(true);
			try {
				// Fetch the transaction
				const transactionRef = doc(db, "transactions", transactionId);
				const res = await getDoc(transactionRef);

				// Check is the transaction exists
				if (!res.exists()) throw new Error("transaction-not-found");

				// Check if the user assigned to the doc is the same as the user who is logged in
				if (user.uid !== res.data().user.id) throw new Error("access-denied-to-transaction");

				// Set the transaction
				const data = await getTransaction(res);
				setTranasction(data);

				setLoading(false);
			} catch (e) {
				console.log("Error fetching the transaction.", e);

				const { message, details } = getErrorMessage(e.message);
				dispatch({
					type: "SET_FEEDBACK",
					feedback: {
						show: true,
						type: "error",
						message,
						details,
					},
				});

				setLoading(false);
			}
		}

		if (transactionId === undefined || user === null) {
			setTranasction(null);
			return;
		}

		fetchTransaction();
	}, [transactionId, user]);

	return { transaction, transactionLoading: loading };
}

export default useTransaction;
