import { useNavigate } from 'react-router-dom';

export const Register = () => {

	const navigate = useNavigate();

	const handleLoginPage = () => {
		navigate('/login', {
			replace: true
		})
	}


	return (
		<>
			<h1>Register</h1>
			<br />

			<button onClick={ handleLoginPage }>Inicia Sesión</button>
		</>
	)
}
