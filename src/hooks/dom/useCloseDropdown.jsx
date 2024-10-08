import { useLayoutEffect } from "react";

function useCloseDropdown(show, setShow, dropdownList) {
	useLayoutEffect(() => {
		function handleClick(e) {
			if (!show) return;

			const dropdown = e.target.closest(".dropdown");
			if (dropdown == null) setShow(false);
		}

		document.addEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	}, [show, setShow]);
}

export default useCloseDropdown;
