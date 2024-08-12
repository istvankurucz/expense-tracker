import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useCloseSidebar(setShow) {
	const location = useLocation();

	useEffect(() => {
		setShow(false);
	}, [location.pathname, setShow]);
}

export default useCloseSidebar;
