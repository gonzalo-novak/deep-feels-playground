import { createBrowserRouter } from 'react-router-dom';
import { Login, Register} from './pages/';

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
}

export const routes = [
	{
		path: ROUTES.HOME,
		element: <Login />,
	},
	{
		path: ROUTES.LOGIN,
		element: <Login />,
	},
	{
		path: ROUTES.REGISTER,
		element: <Register />,
	},
];

export const router = createBrowserRouter(routes);
