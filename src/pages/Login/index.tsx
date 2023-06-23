import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { atom, useAtomValue } from 'jotai';
import { isFetchError } from '../../hooks/useFetch/atoms';
import { ROUTES } from '../../utils/routes';

const testMoodsAtom = atom<{_id: string; name: string;} | null>(null);

export const Login = () => {
	useFetch('moods', testMoodsAtom);
	const moods = useAtomValue(testMoodsAtom);
	const fetchError = useAtomValue(isFetchError);
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
