import { useEffect, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { collection, getDocs, orderBy, query, limit, where, doc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import categories from "../../assets/categories";

function useTransactions(max = null) {
	const [{ user }] = useStateValue();
	const [transactions, setTransactions] = useState([]);
	const [transactionsLoading, setTransactionsLoading] = useState(false);

	useEffect(() => {
		async function fetchUserTransactions() {
			setTransactionsLoading(true);

			try {
				const transactionsRef = collection(db, "transactions");
				const userRef = doc(db, "users", user.uid);

				let q;
				if (max !== null)
					q = query(
						transactionsRef,
						where("user", "==", userRef),
						orderBy("date", "asc"),
						limit(max)
					);
				else q = query(transactionsRef, where("user", "==", userRef), orderBy("date", "asc"));

				const res = await getDocs(q);

				const data = res.docs.map((transaction) => ({
					id: transaction.id,
					category: categories.find(
						(category) => category.name === transaction.data().category
					),
					type: transaction.data().type,
					date: new Date(transaction.data().date.seconds * 1000),
					group: transaction.data().group,
					user: {
						uid: user.uid,
						name: user.displayName,
					},
					name: transaction.data().name,
					amount: transaction.data().amount,
					comment: transaction.data().comment,
				}));
				setTransactions(data);

				setTransactionsLoading(false);
			} catch (e) {
				console.log("Error fetching the transactions of the user.", e);
				setTransactionsLoading(false);
			}
		}

		if (user == null) return;

		fetchUserTransactions();
	}, [user, max]);

	return { transactions, transactionsLoading };
}

export default useTransactions;
