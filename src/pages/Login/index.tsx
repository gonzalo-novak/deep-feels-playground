import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useAtomValue } from 'jotai';
import { ROUTES } from '../../utils/routes';
import { moodsAtom } from '../../states/moods';

export const Login = () => {
	useFetch('moods', moodsAtom);
	const moods = useAtomValue(moodsAtom);
	const navigate = useNavigate();

	const handleRegisterPage = () => {
		navigate(ROUTES.REGISTER, {
			replace: true
		})
	}
	return (
		<>
			<h1>Welcome to Docker + Vite</h1>
			<hr/>
			{(moods) && <h4>Data loaded</h4>}
			<button onClick={handleRegisterPage}>Regístrate</button>
		</>
	)
}
