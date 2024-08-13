import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase/firebase";
import findTransactionCategory from "../../utils/transaction/findTransactionCategory";

function useGroupTransactions() {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const { groupId } = useParams();

	useEffect(() => {
		async function fetchUser(userId) {
			try {
				const userRef = doc(db, "users", userId);
				const user = await getDoc(userRef);

				return { id: user.id, ...user.data() };
			} catch (e) {
				console.log("Error fetching the user.", e);
			}
		}

		async function fetchGroupTransactions() {
			setLoading(true);

			try {
				const transactionsRef = collection(db, "transactions");
				const groupRef = doc(db, "groups", groupId);
				const q = query(
					transactionsRef,
					where("group", "==", groupRef),
					orderBy("date", "desc")
				);

				const res = await getDocs(q);
				const data = await Promise.all(
					res.docs.map(async (transaction) => ({
						id: transaction.id,
						category: findTransactionCategory(transaction.data().category),
						type: transaction.data().type,
						name: transaction.data().name,
						date: new Date(transaction.data().date.seconds * 1000),
						amount: transaction.data().amount,
						comment: transaction.data().comment,
						user: await fetchUser(transaction.data().user.id),
					}))
				);

				setTransactions(data);
				setLoading(false);
			} catch (e) {
				console.log("Error fetching the transactions of the group.", e);
				setLoading(false);
			}
		}

		if (groupId == null) return;

		fetchGroupTransactions();
	}, [groupId]);

	return { transactions, transactionsLoading: loading };
}

export default useGroupTransactions;
