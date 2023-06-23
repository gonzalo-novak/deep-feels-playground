import classNames from 'classnames';
import styles from './styles.module.css';
import { ChangeEvent, DetailedHTMLProps, useState } from "react";

export const Input = ({
	label,
	onValidationFn,
	onChange,
	...rest
}: InputProps) => {
	const [value, setValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleInputChange =
		({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
			setValue(value);
			onChange({ [name]: value });

			if (onValidationFn) {
				const error = onValidationFn(value);
				(typeof error === 'string') ? setErrorMessage(error) : setErrorMessage("");
			}
		}
	return (
		<div className={rest?.className}>
			<label className={styles.label}>
				{label}
				<input
					type='text'
					{...rest}
					onChange={handleInputChange}
					value={value}
					className={(errorMessage) ? styles.inputError : styles.input}
				/>
				{(errorMessage) && <span className={styles.errorMessage}>{errorMessage}</span>}
			</label>
		</div>
	);
}

export type InputProps = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
	label: string;
	onValidationFn?: TValidationFn;
	onChange: (value: { [k: string] : string }) => void;
}

type TValidationFn = (value: string) => string | null;
