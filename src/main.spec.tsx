import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { ROUTES, routes } from './routes';
import { server } from './mocks/server';
import { generateURL } from './mocks/handlers';
import { rest } from 'msw';

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

		const homeTitleEl = await screen.findByRole('heading', { name: /Welcome to Docker \+ Vite/i });
		expect(homeTitleEl).toBeInTheDocument();

		const didFetchEl = await screen.findByRole('heading', { name: /Data loaded/i });
		expect(didFetchEl).toBeInTheDocument();

		const registerBtn = await screen.findByRole('button', { name: /Regístrate/i });
		expect(registerBtn).toBeInTheDocument();
		await user.click(registerBtn);

		const registerTitleEl = await screen.findByRole('heading', { name: /Register/i });
		expect(registerTitleEl).toBeInTheDocument();

		const loginBtn = await screen.findByRole('button', { name: /Inicia Sesión/i });
		expect(loginBtn).toBeInTheDocument();
		await user.click(loginBtn);
	});

	it('Should render an error if the moods fetching fail', async () => {
		const route = createMemoryRouter(routes, { initialEntries: [ROUTES.HOME], initialIndex: 0 });
		server.use(rest.get(generateURL('moods'), (_, res, ctx) => res(ctx.json({ ok: false, data: { message: 'Hello MSW!'} }))))
		render(<RouterProvider router={route}></RouterProvider>);
		
		const homeTitleEl = await screen.findByRole('heading', { name: /Hello MSW/i });
		expect(homeTitleEl).toBeInTheDocument();
	});
});
