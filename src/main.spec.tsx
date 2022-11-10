import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { ROUTES, routes } from './routes';

describe('Component: Router', () => {
	it('Should render pages correctly', async () => {
		const user = userEvent.setup();
		const router = createMemoryRouter(
			routes, { 
				// It refers to the available routes in this context:
				initialEntries: [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER], 
				// The initial router where the application will start.
				initialIndex: 0 
			}
		);
		render(<RouterProvider router={router} />);

		const homeTitleEl = await screen.findByRole('heading', { name: /Login/i });
		expect(homeTitleEl).toBeInTheDocument();

		const registerBtn = await screen.findByRole('button', { name: /Regístrate/i });
		expect(registerBtn).toBeInTheDocument();
		await user.click(registerBtn);

		const registerTitleEl = await screen.findByRole('heading', { name: /Register/i });
		expect(registerTitleEl).toBeInTheDocument();

		const loginBtn = await screen.findByRole('button', { name: /Inicia Sesión/i });
		expect(loginBtn).toBeInTheDocument();
		await user.click(loginBtn);
	});
});
