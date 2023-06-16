import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export const Login = () => {

	const navigate = useNavigate();

	const handleRegisterPage = () => {
		navigate(`/${ROUTES.REGISTER}`, {
			replace: true
		})
	}	

	return (
		<>
			<h1>Welcome to Docker + Vite</h1>
			<hr/>

			<button onClick={handleRegisterPage}>Regístrate</button>
		</>
	)
}
