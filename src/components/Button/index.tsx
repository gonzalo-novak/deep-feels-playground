import styles from './styles.module.css';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export const Button = ({ children, ...rest }: ButtonProps) => (
	<button className={styles.button} { ...rest }>
		{children}
	</button>
);

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
	children: ReactNode
};
