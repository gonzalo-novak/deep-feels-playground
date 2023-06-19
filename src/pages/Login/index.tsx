import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { useFetch } from '../../hooks/useFetch';
import { atom, useAtomValue } from 'jotai';
import { isFetchError } from '../../hooks/useFetch/atoms';

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

	if(fetchError) return <h1>There was an error {fetchError.message}</h1>

	return (
		<>
			<h1>Welcome to Docker + Vite</h1>
			<hr/>
			{(moods) && <h4>Data loaded</h4>}
			<button onClick={handleRegisterPage}>Regístrate</button>
		</>
	)
}
