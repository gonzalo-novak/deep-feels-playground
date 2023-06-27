import { queryByText, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { testWrapper, waitForLoadingToFinish } from "../../utils/test-wrapper";
import { createStore } from "jotai";
import { sessionAtomWithPersistence } from "../../states/session";
import { userAtom } from "../../states/user";
import userRegisteredMock from '../../mocks/register.mock.json';
import userEvent from '@testing-library/user-event';
import { server } from "../../mocks/server";
import { rest } from "msw";
import { generateURL } from "../../mocks/handlers";

describe('Page: Moods', () => {
	it('Should register my emotions correctly', async () => {
		const user = userEvent.setup();

		// Setting up environment
		const store = createStore();
		store.set(sessionAtomWithPersistence, userRegisteredMock.data.token);
		store.set(userAtom, userRegisteredMock.data.user);
		testWrapper(store);

		await waitForLoadingToFinish('Cargando...');

		// Selecting emotions
		await user.click(await screen.findByText('Ansiedad'));
		expect(await screen.findByAltText('Se seleccionó la emoción Ansiedad')).toBeInTheDocument();

		await user.click(await screen.findByText('Depresión'));
		await user.click(await screen.findByText('Depresión'));
		expect(screen.queryByAltText('Se seleccionó la emoción Depresión')).not.toBeInTheDocument();

		await user.click(await screen.findByRole('button', { name: 'Continuar' }));
		expect(await screen.findByRole('heading', { name: new RegExp(userRegisteredMock.data.user.name, 'i') }))
	});

	it('Should show an error if something went wrong at registering a mood', async () => {
		const errorMessage = 'Error at registering your moods';
		server.use(
			rest.put(
				generateURL('registerMoods', { id: userRegisteredMock.data.user._id }),
				(_, res, ctx) => res(ctx.status(500), ctx.json({ ok: false, data: { message: errorMessage} }))
			)
		)
		const user = userEvent.setup();

		// Setting up environment
		const store = createStore();
		store.set(sessionAtomWithPersistence, userRegisteredMock.data.token);
		store.set(userAtom, userRegisteredMock.data.user);
		testWrapper(store);

		await waitForLoadingToFinish('Cargando...');

		await user.click(await screen.findByRole('button', { name: 'No me siento identificado. Deseo continuar.' }));
		expect(await screen.findByText(errorMessage));
	});
});
