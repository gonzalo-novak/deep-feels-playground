import text from './text.json';
import { ROUTES } from "../../utils/routes";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { testWrapper } from "../../utils/test-wrapper";
import { server } from '../../mocks/server';
import { rest } from 'msw';
import { generateURL } from '../../mocks/handlers';

describe('Module: Register', () => {
	const wrapper = async () => {
		const user = userEvent.setup();
		testWrapper([ROUTES.REGISTER, ROUTES.LOGIN]);
		expect(await screen.findByText(text.title)).toBeInTheDocument();
		expect(await screen.findByText(text.form.name.label)).toBeInTheDocument();

		const nameInputEl = await screen.findByLabelText(text.form.name.label, { selector: 'input' });
		const emailInputEl = await screen.findByLabelText(text.form.email.label, { selector: 'input' });
		const passwordInputEl = await screen.findByLabelText(text.form.password.label, { selector: 'input' });

		// Filling up form
		await user.type(nameInputEl, 'Gonzalo');

		await user.type(emailInputEl, 'gonzalo');
		expect(await screen.findByText(text.form.email.validationMessages.badEmailFormat)).toBeInTheDocument();
		await user.type(emailInputEl, '@main.com');
		expect(screen.queryByText(text.form.email.validationMessages.badEmailFormat)).toBeFalsy();

		let registerButton = await screen.findByRole('button', { name: text.main_cta });

		expect(registerButton).toBeDisabled();
		await user.type(passwordInputEl, 'Password12345');
		expect(registerButton).not.toBeDisabled();
		await userEvent.click(await screen.findByRole('button', { name: text.main_cta }));
	};

	it('Should show an error message if something fails at registering', async () => {
		const errorMessage = 'There was an error. Try later.'
		server.use(
			rest.post(
				generateURL('register'),
				(_, res, ctx) => res(ctx.status(500), ctx.json({ ok: false, data: { message: errorMessage }}))
			)
		);
		await wrapper();
		expect(await screen.findByText(errorMessage)).toBeInTheDocument();
	});

	it('Should register successfully', async () => {
		await wrapper();
		expect(await screen.findByText('Welcome to Docker + Vite')).toBeInTheDocument();
	});
});

