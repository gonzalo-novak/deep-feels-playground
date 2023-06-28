import { Text } from "../Text";
import styles from './styles.module.css';
import globalStyles from '../../global.module.css';

export const Spinner = () => {
	return (
		<div className={styles.spinner} role="progressbar">
			<div className={globalStyles.containerStack}>
				<img className={styles.icon} src="/loading-animation.svg" alt="Icono de carga"/>
				<Text type="h3" className={styles.title}>Cargando</Text>
				<Text>Espera un momento</Text>
			</div>
		</div>
	)
};
