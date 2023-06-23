import 'react-toastify/dist/ReactToastify.min.css';
import styles from './style.module.css';
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { isFetchError } from '../../hooks/useFetch/atoms';

export const Layout = () => {
	const [fetchError, setFetchError] = useAtom(isFetchError);
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
 return (
 	<div className={styles.container}>
		<Outlet></Outlet>
		<ToastContainer />
	</div>
 )
};
