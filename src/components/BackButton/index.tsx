import { ImgHTMLAttributes, useCallback } from "react";
import styles from './styles.module.css';
import { useNavigate } from "react-router-dom";

export const BackButton = ({...rest}: ImgHTMLAttributes<HTMLImageElement>) => {
	const navigate = useNavigate();

	const handleItemClick = useCallback(() => {
		navigate(-1);
	}, []);

	return (
		<img
			className={styles.backButton}
			src="/arrow-back.svg"
			onClick={handleItemClick}
			role="button"
			alt="Regresar a la sección anterior"
			{...rest}
		/>
	);
}
