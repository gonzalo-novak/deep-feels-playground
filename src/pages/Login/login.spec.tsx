import { screen } from "@testing-library/react"
import { testWrapper } from "../../utils/test-wrapper"
import { ROUTES } from "../../utils/routes"
import userEvent from '@testing-library/user-event';
import { text as registerPageText } from "../Register/text";

describe('Page: Login', () => {
	it('Should render correctly', async () => {
		const user = userEvent.setup();
		testWrapper([ROUTES.LOGIN, ROUTES.REGISTER])
		expect(await screen.findByText('Data loaded')).toBeInTheDocument();
		await user.click(await screen.findByRole('button', { name: 'Regístrate' }));
		expect(await screen.findByRole('heading', { name: registerPageText.title }))
	})
})
