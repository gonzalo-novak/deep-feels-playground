import { createBrowserRouter } from 'react-router-dom';
import { Login, Register, Home} from './pages/index';
import { Layout } from './components/Layout';

export const ROUTES = {
	HOME: '/',
	LOGIN: 'login',
	REGISTER: 'register',
}

export const routes = [
	{
		path: ROUTES.HOME,
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: ROUTES.LOGIN,
				element: <Login />
			},
			{
				path: ROUTES.REGISTER,
				element: <Register />
			},
		]
	},
];

export const router = createBrowserRouter(routes);
