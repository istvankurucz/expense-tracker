import PropTypes from "prop-types";
import { forwardRef } from "react";
import RequiredIcon from "../RequiredIcon/RequiredIcon";
import "./Radio.css";

const Radio = forwardRef(({ variant = "accent", label, id, name, className, ...rest }, ref) => {
	return (
		<label htmlFor={id} className={`radio radio--${variant}${className ? ` ${className}` : ""}`}>
			<input type="radio" name={name} id={id} ref={ref} className="radio__input" {...rest} />
			<span className="radio__marker"></span>
			<span className="radio__label">
				{label}
				{rest.required && <RequiredIcon />}
			</span>
		</label>
	);
});

Radio.displayName = "Radio";

Radio.propTypes = {
	variant: PropTypes.oneOf(["accent"]),
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default Radio;
