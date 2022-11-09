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

		screen.debug();

		const homeTitleEl = await screen.findByRole("heading", { name: /Home/i });
		expect(homeTitleEl).toBeInTheDocument();

		const goToAboutUsPageEl = await screen.findByRole('link', { name: /Login/i });
		expect(goToAboutUsPageEl).toBeInTheDocument();
		await user.click(goToAboutUsPageEl);
		
		const goToUsersPageEl = await screen.findByRole('link', { name: /Register/i });
		expect(goToUsersPageEl).toBeInTheDocument();
		await user.click(goToUsersPageEl);
		
	});
});
