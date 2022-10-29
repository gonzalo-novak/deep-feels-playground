import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Component: App', () => {
	it('Should render correctly', async () => {
		const user = userEvent.setup();
		render(<App />);
		const incrementButtonEl = await screen.findByRole("button", { name: 'count is 0' })
		expect(incrementButtonEl).toBeInTheDocument();

		user.click(incrementButtonEl);

		expect(await screen.findByRole("button", { name: 'count is 1' })).toBeInTheDocument();
	});
});
