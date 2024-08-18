import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGroups from "./useGroups";
import { useStateValue } from "../../contexts/Context API/StateProvider";

const noGroup = {
	id: "no-group",
	name: "-",
};

function useGroupSelect() {
	// States
	const [, dispatch] = useStateValue();
	const { groups } = useGroups();
	const [searchParams] = useSearchParams();
	const [groupSelectItems, setGroupSelectItems] = useState([noGroup]);
	const [index, setIndex] = useState(0);

	// Variables
	const groupId = searchParams.get("groupId");

	// Functions
	const checkValidGroupId = useCallback(() => {
		if (groupId === "") return false;

		let valid = false;
		groups.forEach((group) => {
			if (group.id === groupId) valid = true;
		});

		return valid;
	}, [groups, groupId]);

	const getDefaultGroupIndex = useCallback(() => {
		if (groupId === "") return 0;

		let index = 0;
		groups.forEach((group, i) => {
			if (group.id === groupId) index = i;
		});
		return index + 1;
	}, [groups, groupId]);

	// effect
	useEffect(() => {
		// Check if there is any group of the user
		if (groups.length === 0) return;

		// Set the items of the select
		const items = [noGroup, ...groups.map((group) => ({ id: group.id, name: group.name }))];
		setGroupSelectItems(items);

		// Check if there is a given group ID
		if (groupId == null) return;

		// Check if the ID is valid
		if (!checkValidGroupId()) return;

		// Set the default index
		setIndex(getDefaultGroupIndex());

		// Show feedback that the group has been selected automatically
		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				show: true,
				type: "info",
				message: "A csoport automatikusan beállításra került.",
				details: "Ha szeretnéd módosíthatod a lap alján.",
			},
		});
	}, [groups, groupId, checkValidGroupId, getDefaultGroupIndex, dispatch]);

	return { groupSelectItems, index, setIndex };
}

export default useGroupSelect;
