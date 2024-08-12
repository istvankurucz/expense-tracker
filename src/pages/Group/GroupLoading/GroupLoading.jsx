import Overlay from "../../../components/layout/Overlay/Overlay";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { useGroupContext } from "../../../contexts/group/GroupContext";

function GroupLoading() {
	const { groupLoading } = useGroupContext();

	return (
		<Overlay show={groupLoading} className="groupLoading">
			<Spinner variant="text" size="5rem" text="Csoport adatainak betöltése.." />
		</Overlay>
	);
}

export default GroupLoading;
