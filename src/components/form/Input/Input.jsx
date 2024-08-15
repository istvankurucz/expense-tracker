import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../ui/Button/Button";
import RequiredIcon from "../RequiredIcon/RequiredIcon";
import "./Input.css";

const Input = forwardRef(
	(
		{
			direction = "vertical",
			variant = "accent",
			label,
			type = "text",
			id,
			fullW,
			centered,
			round,
			className,
			...rest
		},
		ref
	) => {
		const [showPassword, setShowPassword] = useState(false);

		return (
			<div
				className={`input input--${variant} input--${direction}${fullW ? " input--full" : ""}${
					centered ? " input--centered" : ""
				}${round ? " input--round" : ""}${className ? ` ${className}` : ""}`}
			>
				<label htmlFor={id} className="input__label">
					{label}
					{rest.required && <RequiredIcon />}
				</label>

				<div className="input__main">
					<input
						type={type === "password" && showPassword ? "text" : type}
						id={id}
						ref={ref}
						{...rest}
						className="input__input"
					/>
					{type === "password" && (
						<Button
							variant="transparent"
							icon
							className="input__showPw"
							onClick={() => setShowPassword((show) => !show)}
						>
							<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
						</Button>
					)}
				</div>
			</div>
		);
	}
);

Input.displayName = "Input";
Input.propTypes = {
	direction: PropTypes.oneOf(["vertical", "horizontal"]),
	variant: PropTypes.oneOf(["accent", "success", "danger"]),
	label: PropTypes.string,
	type: PropTypes.string,
	id: PropTypes.string.isRequired,
	fullW: PropTypes.bool,
	centered: PropTypes.bool,
	className: PropTypes.string,
};

export default Input;
