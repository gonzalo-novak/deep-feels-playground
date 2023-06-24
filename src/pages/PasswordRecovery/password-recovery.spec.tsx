import { screen } from "@testing-library/dom";
import userEvent from '@testing-library/user-event';
import { testWrapper } from "../../utils/test-wrapper"

describe('Module: Password Recovery', () => {
	it('Should render correctly', async () => {
		const user = userEvent.setup();
		testWrapper();
		await user.click(await screen.findByRole('link', { name: '¿Olvidaste tu contraseña?' }));
		expect(await screen.findByText('Hello Password Recovery'));
	});
});
