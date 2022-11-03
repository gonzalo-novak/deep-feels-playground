import { useNavigate } from 'react-router-dom';

export const Login = () => {

	const navigate = useNavigate();

	const handleRegisterPage = () => {
		navigate('/register', {
			replace: true
		})
	}


	return (
		<>
			<h1>Login</h1>
			<br />

			<button onClick={ handleRegisterPage }>Regístrate</button>
		</>
	)
}
