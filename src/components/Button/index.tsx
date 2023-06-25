import classNames from 'classnames';
import styles from './styles.module.css';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export const Button = ({ children, ...rest }: ButtonProps) => (
	<button { ...rest } className={classNames(styles.button, rest.className)}>
		{children}
	</button>
);

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
	children: ReactNode
};
