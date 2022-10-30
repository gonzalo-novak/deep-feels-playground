import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from ".";

describe('Page: Home', async () => {
	it('Should increment the counter', async () => {
		const user = userEvent.setup();
		render(<Home />);
		
		const incrementButtonEl = await screen.findByRole('button', { name: /count is 0/ });
		expect(incrementButtonEl).toBeInTheDocument();

		await user.click(incrementButtonEl);
		expect(await screen.findByRole('button', { name: /count is 1/ }));
	});
});
