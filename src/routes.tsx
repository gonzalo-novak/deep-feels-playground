import { createBrowserRouter } from 'react-router-dom';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Users } from './pages/Users';
import { Layout } from './components/Layout';

export const ROUTES = {
	HOME: '/',
	ABOUT: 'about',
	USERS: 'users',
}

export const routes = [
	{
		path: ROUTES.HOME,
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: ROUTES.ABOUT,
				element: <About />
			},
			{
				path: ROUTES.USERS,
				element: <Users />
			},
		]
	},
];

export const router = createBrowserRouter(routes);
