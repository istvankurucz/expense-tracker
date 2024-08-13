import PropTypes from "prop-types";
import { useStateValue } from "../../../../contexts/Context API/StateProvider";
import NoUser from "../../Section/NoUser/NoUser";
import UserLoading from "../../../ui/Loading/UserLoading/UserLoading";
import LoadingFrame from "../LoadingFrame";
import "./UserLoadingFrame.css";

function UserLoadingFrame({ children }) {
	const [{ user, userLoading }] = useStateValue();

	return (
		<LoadingFrame
			loading={userLoading}
			loadingElement={<UserLoading />}
			error={!userLoading && user == null}
			errorElement={<NoUser />}
		>
			{children}
		</LoadingFrame>
	);
}

UserLoadingFrame.propTypes = {
	children: PropTypes.node.isRequired,
};

export default UserLoadingFrame;
