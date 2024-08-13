import { useGroupContext } from "../../../../contexts/group/GroupContext";
import Overlay from "../../../layout/Overlay/Overlay";
import Spinner from "../../Spinner/Spinner";

function GroupLoading() {
	const { groupLoading } = useGroupContext();

	return (
		<Overlay show={groupLoading} className="groupLoading">
			<Spinner variant="text" size="5rem" text="Csoport adatainak betöltése.." />
		</Overlay>
	);
}

export default GroupLoading;
