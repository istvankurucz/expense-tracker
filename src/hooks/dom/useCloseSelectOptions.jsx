import { useEffect } from "react";

function useCloseSelectOptions(show, setShow) {
	useEffect(() => {
		function handleClick(e) {
			if (!show) return;

			// If the user clicked on one of the options
			const selectOptionLi = e.target.closest(".select__options li");
			if (selectOptionLi != null) {
				setShow(false);
				return;
			}

			// If the user clicked outside from the select
			const select = e.target.closest(".select");
			if (select == null) {
				setShow(false);
				return;
			}
		}

		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [show, setShow]);
}

export default useCloseSelectOptions;
