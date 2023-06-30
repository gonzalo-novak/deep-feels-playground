import styles from './styles.module.css';
import { ChangeEvent, DetailedHTMLProps, forwardRef, useCallback, useEffect, useRef, useState } from "react";

export const Input = forwardRef(({
	label,
	onValidationFn,
	setValues,
	...rest
}: InputProps, ref: any) => {
	const didMount = useRef(false);
	const {defaultValue, ...restProps} = rest;
	const [errorMessage, setErrorMessage] = useState("");

	const handleInputChange = useCallback(({ target: { value, name, type, files } }: ChangeEvent<HTMLInputElement>) => {
		if (onValidationFn) {
			const error = onValidationFn(value);
			(typeof error === 'string') ? setErrorMessage(error) : setErrorMessage("");
		}
		setValues((currentVal: { [k: string] : any }) => ({ ...currentVal, [name]: (type === 'file') ? files : value }));
	}, []);

	return (
		<div className={rest?.className}>
			<label className={styles.label}>
				{label}
				<input
					type='text'
					{...restProps}
					onChange={handleInputChange}
					className={(errorMessage) ? styles.inputError : styles.input}
					ref={ref}
				/>
				{(errorMessage) && <span className={styles.errorMessage}>{errorMessage}</span>}
			</label>
		</div>
	);
})

export type InputProps = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
	label: string;
	onValidationFn?: TValidationFn;
	setValues: React.Dispatch<React.SetStateAction<any>>;
}

type TValidationFn = (value: string) => string | null;
