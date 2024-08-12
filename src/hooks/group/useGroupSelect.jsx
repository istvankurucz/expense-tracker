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

	const getGroupSelectItems = useCallback(
		(validGroupId) => {
			if (validGroupId) {
				return [noGroup, ...groups.map((group) => ({ id: group.id, name: group.name }))];
			} else return [noGroup];
		},
		[groups]
	);

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
		// Check if there is a group ID
		if (groupId == null) return;

		// Check if the ID is valid
		const validGroupId = checkValidGroupId();
		if (!validGroupId) return;

		// Set the items of the select
		setGroupSelectItems(getGroupSelectItems(validGroupId));

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
	}, [groupId, checkValidGroupId, getGroupSelectItems, getDefaultGroupIndex, dispatch]);

	return { groupSelectItems, index, setIndex };
}

export default useGroupSelect;
