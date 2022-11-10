import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export const Register = () => {

	const navigate = useNavigate();
	
	const handleLoginPage = () => {
		navigate(`/${ROUTES.LOGIN}`, {
			replace: true
		})
	}	

	return (
		<>
			<h1>Register</h1>
			<hr/>

			<button onClick={handleLoginPage}>Inicia Sesión</button>
		</>
	)
}
