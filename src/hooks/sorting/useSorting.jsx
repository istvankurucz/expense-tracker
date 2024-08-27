import { useState } from "react";

function useSorting(property = "date", asc = false) {
	const [sorting, setSorting] = useState({ property, asc });

	function setSortingParams(property) {
		if (property === sorting.property) {
			setSorting((sorting) => ({
				property: sorting.property,
				asc: !sorting.asc,
			}));
		} else {
			setSorting({
				property: property,
				asc: false,
			});
		}
	}

	return { sorting, setSorting, setSortingParams };
}

export default useSorting;
