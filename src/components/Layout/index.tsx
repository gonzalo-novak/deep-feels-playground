import 'react-toastify/dist/ReactToastify.min.css';
import styles from './style.module.css';
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { isFetchError, isLoading } from '../../hooks/useFetch/atoms';
import { sessionAtomWithPersistence } from '../../states/session';
import { userAtom } from '../../states/user';
import { ROUTES } from '../../utils/routes';
import { Spinner } from '../Spinner';

export const Layout = () => {
	const navigate = useNavigate();
	const { hasSelectedTheirMoods } = useAtomValue(userAtom);
	const [fetchError, setFetchError] = useAtom(isFetchError);
	const isFetching = useAtomValue(isLoading)
	const session = useAtomValue(sessionAtomWithPersistence);

	useEffect(() => {
		if(fetchError?.message){
			const id = toast.error(fetchError.message, {
				position: "bottom-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				});
			setFetchError(null);
		}
	}, [fetchError?.message]);

	useEffect(() => {
		if(session){
			if(!hasSelectedTheirMoods)
				navigate(ROUTES.MOODS);
			else
				navigate(ROUTES.PROFILE);
		} else {
			navigate(ROUTES.LOGIN);
		}
	}, [session, hasSelectedTheirMoods]);

 return (
	<>
	{(isFetching) && <Spinner />}
 	<div className={styles.container}>
		<Outlet></Outlet>
		<ToastContainer />
	</div>
	</>
 )
};
