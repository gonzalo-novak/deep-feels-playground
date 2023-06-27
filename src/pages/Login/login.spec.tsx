import { screen } from "@testing-library/react"
import { testWrapper } from "../../utils/test-wrapper"
import userEvent from '@testing-library/user-event';
import { text } from "./text";
import { validationMessages } from "../../utils/formValidators";
import { server } from "../../mocks/server";
import { rest } from "msw";
import { generateURL } from "../../mocks/handlers";

describe('Page: Login', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('Should show an error message if there was a fetch error', async () => {
		const errorMessage = 'El usuario o contraseña no son correctos. Intenta de nuevo.';
		server.use(
			rest.post(generateURL('login'), (_, res, ctx) => res(ctx.status(500), ctx.json({ ok: false, data: { message: errorMessage } })))
		)
		const user = userEvent.setup();
		testWrapper()
		expect(await screen.findByRole('heading', { name: text.title })).toBeInTheDocument();
		expect(await screen.findByText(text.subtitle)).toBeInTheDocument();

		const emailInputEl = await screen.findByLabelText(text.form.email.label, { selector: 'input' });
		const passwordInputEl = await screen.findByLabelText(text.form.password.label, { selector: 'input' });
		const registerButton = await screen.findByRole('button', { name: text.main_cta });

		// Filling up the form:
		await user.type(emailInputEl, 'gonzalo');
		expect(await screen.findByText(validationMessages.email)).toBeInTheDocument();
		await user.type(emailInputEl, '@main.com');
		expect(screen.queryByText(validationMessages.email)).toBeFalsy();

		expect(registerButton).toBeDisabled();
		await user.type(passwordInputEl, 'IncorrectPassword1');
		expect(registerButton).not.toBeDisabled();

		await userEvent.click(await screen.findByRole('button', { name: text.main_cta }));
		expect(await screen.findByText(errorMessage));
	});

	it('Should render correctly', async () => {
		const user = userEvent.setup();
		testWrapper()
		expect(await screen.findByRole('heading', { name: text.title })).toBeInTheDocument();
		expect(await screen.findByText(text.subtitle)).toBeInTheDocument();

		const emailInputEl = await screen.findByLabelText(text.form.email.label, { selector: 'input' });
		const passwordInputEl = await screen.findByLabelText(text.form.password.label, { selector: 'input' });
		const registerButton = await screen.findByRole('button', { name: text.main_cta });

		// Filling up the form:
		await user.type(emailInputEl, 'gonzalo');
		expect(await screen.findByText(validationMessages.email)).toBeInTheDocument();
		await user.type(emailInputEl, '@main.com');
		expect(screen.queryByText(validationMessages.email)).toBeFalsy();

		expect(registerButton).toBeDisabled();
		await user.type(passwordInputEl, 'Password12345');
		expect(registerButton).not.toBeDisabled();

		await userEvent.click(await screen.findByRole('button', { name: text.main_cta }));
		expect(await screen.findByRole('heading', { name: 'Hello Sofia Stergo' }));
	});
})
