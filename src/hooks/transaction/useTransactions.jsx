import { useEffect, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { collection, getDocs, orderBy, query, limit, where, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import categories from "../../assets/categories";

function useTransactions(max = null) {
	const [{ user }] = useStateValue();
	const [transactions, setTransactions] = useState([]);
	const [transactionsLoading, setTransactionsLoading] = useState(false);

	useEffect(() => {
		async function fetchGroupData(groupId) {
			try {
				const groupRef = doc(db, "groups", groupId);
				const group = await getDoc(groupRef);
				return { id: group.id, name: group.data().name };
			} catch (e) {
				console.log("Error fetching the group.", e);
			}
		}

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
						orderBy("date", "desc"),
						limit(max)
					);
				else q = query(transactionsRef, where("user", "==", userRef), orderBy("date", "desc"));

				const res = await getDocs(q);

				const data = await Promise.all(
					res.docs.map(async (transaction) => {
						const groupData =
							transaction.data().group == null
								? null
								: await fetchGroupData(transaction.data().group.id);

						return {
							id: transaction.id,
							category: categories.find(
								(category) => category.name === transaction.data().category
							),
							type: transaction.data().type,
							date: new Date(transaction.data().date.seconds * 1000),
							group: groupData,
							user: {
								id: user.uid,
								name: user.displayName,
							},
							name: transaction.data().name,
							amount: transaction.data().amount,
							comment: transaction.data().comment,
						};
					})
				);
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
