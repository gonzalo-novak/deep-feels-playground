import { screen } from "@testing-library/react";
import { testWrapper, waitForLoadingToFinish } from "../../utils/test-wrapper";
import { createStore } from "jotai";
import { sessionAtomWithPersistence } from "../../states/session";
import loggedUserMock from '../../mocks/login.mock.json';
import { userAtom } from "../../states/user";
import { text } from "./text";
import userEvent from '@testing-library/user-event';

describe('Page: Sound List', () => {
	it('Should render correctly', async () => {
		const user = userEvent.setup();
		const store = createStore();
		store.set(sessionAtomWithPersistence, loggedUserMock.data.token);
		store.set(userAtom, loggedUserMock.data.user)
		testWrapper(store);
		await waitForLoadingToFinish();

		const soundCardItemEl = await screen.findByAltText('Start playing Jazz Coffee');
		await user.click(soundCardItemEl);

		expect(await screen.findByRole('heading', { name: 'Hola ' + loggedUserMock.data.user.name })).toBeInTheDocument();
		expect(await screen.findByText(text.subtitle)).toBeInTheDocument();

		const profileButtonEl = await screen.findByLabelText(`Change ${loggedUserMock.data.user.name}'s profile data`);
		await user.click(profileButtonEl);
		expect(await screen.findByRole('heading', { name: 'Tu perfil'})).toBeInTheDocument();
	});
});
