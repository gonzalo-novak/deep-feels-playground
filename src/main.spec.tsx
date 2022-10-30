import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { ROUTES, routes } from './routes';

describe('Component: Router', () => {
	it('Should render pages correctly', async () => {
		const user = userEvent.setup();
		const router = createMemoryRouter(
			routes, { 
				// It refers to the available routes in this context:
				initialEntries: [ROUTES.HOME, ROUTES.ABOUT, ROUTES.USERS], 
				// The initial router where the application will start.
				initialIndex: 0 
			}
		);
		render(<RouterProvider router={router} />);

		const homeTitleEl = await screen.findByRole("heading", { name: /Vite/i });
		expect(homeTitleEl).toBeInTheDocument();

		const goToAboutUsPageEl = await screen.findByRole('link', { name: /About us/i });
		expect(goToAboutUsPageEl).toBeInTheDocument();
		await user.click(goToAboutUsPageEl);

		const aboutUsTitleEl = await screen.findByRole("heading", { name: /About/i });
		expect(aboutUsTitleEl).toBeInTheDocument();
		
		// We're checking the /home content has been removed:
		expect(homeTitleEl).not.toBeInTheDocument();

		
		const goToUsersPageEl = await screen.findByRole('link', { name: /Users/i });
		expect(goToUsersPageEl).toBeInTheDocument();
		await user.click(goToUsersPageEl);
		
		// We're checking the /about content has been removed:
		expect(aboutUsTitleEl).not.toBeInTheDocument();

		expect(await screen.findByRole('heading', { name: /Users/i })).toBeInTheDocument();

	});
});
