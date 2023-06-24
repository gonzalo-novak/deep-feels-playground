import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { Login, Register } from './pages/';
import { ROUTES } from './utils/routes';
import { Layout } from './components/Layout';
import { Moods } from './pages/Moods';
import { SoundsList } from './pages/SoundsList';
import { PasswordRecovery } from './pages/PasswordRecovery';

export const routes: RouteObject[] = [
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
			{
				path: ROUTES.PASSWORD_RECOVERY,
				element: <PasswordRecovery />
			},
		]
	},
	{
		path: ROUTES.PROFILE,
		element: <Layout />,
		children: [
			{ index: true, element: <SoundsList /> },
			{
				path: ROUTES.MOODS,
				element: <Moods />
			},
		]
	}
];
export const router = createBrowserRouter(routes);
