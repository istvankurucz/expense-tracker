import { useEffect, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { collection, getDocs, orderBy, query, limit, where, doc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import findTransactionCategory from "../../utils/transaction/findTransactionCategory";
import { useParams, useSearchParams } from "react-router-dom";
import fetchGroup from "../../utils/group/fetchGroup";
import fetchUser from "../../utils/user/fetchUser";

function useTransactions(max = null) {
	// States
	const [{ user }] = useStateValue();
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(false);
	const { groupId } = useParams();
	const [searchParams] = useSearchParams();

	// Variables
	const isGroupTransactions = groupId != undefined || searchParams.get("groupId") != null;

	// Functions
	function getGroupId() {
		if (!isGroupTransactions) return "";

		return groupId == undefined ? searchParams.get("groupId") : groupId;
	}

	function createQuery() {
		const transactionsRef = collection(db, "transactions");
		let q;

		// Check whose transactions shall be fetched (user/group)
		if (!isGroupTransactions) {
			const userRef = doc(db, "users", user.uid);

			if (max != null) {
				q = query(
					transactionsRef,
					where("user", "==", userRef),
					orderBy("date", "desc"),
					limit(max)
				);
			} else {
				q = query(transactionsRef, where("user", "==", userRef), orderBy("date", "desc"));
			}
		} else {
			const groupId = getGroupId();
			const groupRef = doc(db, "groups", groupId);

			if (max != null) {
				q = query(
					transactionsRef,
					where("group", "==", groupRef),
					orderBy("date", "desc"),
					limit(max)
				);
			} else {
				q = query(transactionsRef, where("group", "==", groupRef), orderBy("date", "desc"));
			}
		}

		return q;
	}

	async function getGroup(transactionGroup) {
		if (transactionGroup == null) return null;

		const group = await fetchGroup(transactionGroup.id);
		return group;
	}

	async function getTransactions(docs = []) {
		const transactions = docs.map(async (transaction) => {
			return {
				id: transaction.id,
				category: findTransactionCategory(transaction.data().category),
				type: transaction.data().type,
				date: new Date(transaction.data().date.seconds * 1000),
				group: await getGroup(transaction.data().group),
				user: await fetchUser(transaction.data().user.id),
				name: transaction.data().name,
				amount: transaction.data().amount,
				comment: transaction.data().comment,
			};
		});

		return await Promise.all(transactions);
	}

	useEffect(() => {
		async function fetchTransactions() {
			setLoading(true);

			try {
				const q = createQuery();
				const res = await getDocs(q);

				const data = await getTransactions(res.docs);

				setTransactions(data);
				setLoading(false);
			} catch (e) {
				console.log("Error fetching the transactions of the user.", e);
				setLoading(false);
			}
		}

		if (user == null) return;

		fetchTransactions();
	}, [user, max]);

	return { transactions, transactionsLoading: loading, isGroupTransactions };
}

export default useTransactions;
