import PropTypes from "prop-types";
import { useGroupContext } from "../../../../contexts/group/GroupContext";
import { useStateValue } from "../../../../contexts/Context API/StateProvider";
import LoadingFrame from "../LoadingFrame";
import UserLoading from "../../../ui/UserLoading/UserLoading";
import NoAccessToGroup from "../../Section/NoAccessToGroup/NoAccessToGroup";
import "./GroupLoadingFrame.css";

function GroupLoadingFrame({ children }) {
	const [{ userLoading }] = useStateValue();
	const { group, groupLoading } = useGroupContext();

	// console.log("Error:", (!groupLoading && user == null) || (group == null && !groupLoading));

	return (
		<LoadingFrame
			loading={groupLoading || userLoading}
			loadingElement={<UserLoading />}
			error={group == null && !groupLoading}
			errorElement={<NoAccessToGroup />}>
			{children}
		</LoadingFrame>
	);
}

GroupLoadingFrame.propTypes = {
	children: PropTypes.node.isRequired,
};

export default GroupLoadingFrame;
