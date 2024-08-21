import fetchGroup from "../group/fetchGroup";
import fetchUser from "../user/fetchUser";
import findTransactionCategory from "./findTransactionCategory";

export default async function getTransaction(transaction) {
	return {
		id: transaction.id,
		category: findTransactionCategory(transaction.data().category),
		type: transaction.data().type,
		date: new Date(transaction.data().date.seconds * 1000),
		group: await fetchGroup(transaction.data().group),
		user: await fetchUser(transaction.data().user.id),
		name: transaction.data().name,
		amount: transaction.data().amount,
		comment: transaction.data().comment,
	};
}
