import { createBrowserRouter } from 'react-router-dom';
import { Login, Register } from './pages/';
import { ROUTES } from './utils/routes';
import { Layout } from './components/Layout';

export const routes = [
	{
		path: ROUTES.HOME,
		element: <Layout />,
		children: [
			{ index: true, element: <Login /> },
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
