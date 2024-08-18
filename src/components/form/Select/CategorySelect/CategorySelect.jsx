import { useState } from "react";
import PropTypes from "prop-types";
import CategorySelectOption from "./CategorySelectOption/CategorySelectOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import RequiredIcon from "../../RequiredIcon/RequiredIcon";
import useCloseSelectOptions from "../../../../hooks/dom/useCloseSelectOptions";
import "./CategorySelect.css";

function CategorySelect({ items, index, setIndex, id, className = "" }) {
	// States
	const [showOptions, setShowOptions] = useState(false);
	useCloseSelectOptions(showOptions, setShowOptions);

	return (
		<div className={`select categorySelect${className !== "" ? ` ${className}` : ""}`}>
			<label htmlFor={id} className="categorySelect__label">
				Kategória
				<RequiredIcon />
			</label>

			<button
				type="button"
				style={{
					"--_text-color": items[index].colors.text,
					"--bg-color": items[index].colors.bg,
				}}
				className="categorySelect__selected"
				onFocus={() => setShowOptions(true)}>
				<CategorySelect.Option category={items[index]} />
				<FontAwesomeIcon icon={faAngleDown} />
			</button>

			{showOptions && (
				<ul className="select__options categorySelect__options scrollbar">
					{items.map((category, i) => (
						<li key={category.name} onClick={() => setIndex(i)}>
							<CategorySelect.Option category={category} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

CategorySelect.propTypes = {
	items: PropTypes.array.isRequired,
	index: PropTypes.number.isRequired,
	setIndex: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
};

CategorySelect.Option = CategorySelectOption;

export default CategorySelect;
