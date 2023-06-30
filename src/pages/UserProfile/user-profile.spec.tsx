import { createStore } from "jotai";
import { testWrapper, waitForLoadingToFinish } from "../../utils/test-wrapper";
import { sessionAtomWithPersistence } from "../../states/session";
import { userAtom } from "../../states/user";
import loggedUserMock from '../../mocks/login.mock.json';
import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";

describe('Page: User Profile Edit', () => {
	it('Should update the profile correctly', async () => {
		const user = userEvent.setup();
		const store = createStore();
		store.set(sessionAtomWithPersistence, loggedUserMock.data.token);
		store.set(userAtom, loggedUserMock.data.user);

		testWrapper(store);
		await waitForLoadingToFinish();

		const editProfileButtonEl = await screen.findByLabelText(`Change ${loggedUserMock.data.user.name}'s profile data`);
		expect(editProfileButtonEl).toBeInTheDocument();
		await user.click(editProfileButtonEl);

		const editNameInputEl = await screen.findByLabelText('Nombre', { selector: 'input' });
		expect(editNameInputEl).toBeInTheDocument();

		expect(screen.queryByText('Guardar cambios')).not.toBeInTheDocument();
		await user.type(editNameInputEl, '!');

		const saveChangesButtonEl = await screen.findByText('Guardar cambios');
		expect(saveChangesButtonEl).toBeInTheDocument();

		const cancelChangesEl = await screen.findByText('Cancelar');
		expect(cancelChangesEl).toBeInTheDocument();

		await user.click(cancelChangesEl);
		expect(await screen.findByLabelText('Nombre')).toHaveValue(loggedUserMock.data.user.name);
		expect(screen.queryByText('Cancelar')).not.toBeInTheDocument();

		await user.type(editNameInputEl, '!');
		expect(await screen.findByLabelText('Nombre')).toHaveValue(loggedUserMock.data.user.name + '!');

		expect(await screen.findByText('Guardar cambios')).toBeInTheDocument();
		await user.click(await screen.findByText('Guardar cambios'));
		act(() => {
			expect(screen.queryByText('Guardar cambios')).not.toBeInTheDocument();
		})
	});
});
