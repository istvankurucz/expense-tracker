import { useStateValue } from "../../../../contexts/Context API/StateProvider";
import Overlay from "../../../layout/Overlay/Overlay";
import Spinner from "../../Spinner/Spinner";
import "./UserLoading.css";

function UserLoading() {
	const [{ userLoading }] = useStateValue();

	return (
		<Overlay show={userLoading} className="userLoading">
			<Spinner variant="text" size="5rem" text="Adatok betöltése.." />
		</Overlay>
	);
}

export default UserLoading;
