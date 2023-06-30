import { rest } from 'msw'
import { ENDPOINTS } from '../utils/endpoints'

// Mocks
import moodsJSON from './moods.mock.json';
import loginJSON from './login.mock.json';
import registerJSON from './register.mock.json';
import soundListJSON from './sound-list.mock.json';
import registeredMoodsJSON from './registered-moods.json';
import updatedUserJSON from './user-updated.mock.json';

import { FETCH_API_CONTEXT } from '../utils/constants';

export const generateURL = (endpoint: keyof typeof ENDPOINTS, params?: { [k: string]: any }) => (
	// We'll omit this line as we don't need to test it because it's
	// only used in testing environments
	/* c8 ignore next */
	(process.env?.TEST_API_HOST || '')
	+ FETCH_API_CONTEXT
	+ (
		(params)
		? (
				Object.entries(params).reduce((acc, [k, v]) => {
					acc = ENDPOINTS[endpoint].replace(k, String(v))
					return acc
				}, '')
			)
		: ENDPOINTS[endpoint]
	)
);

export const handlers = [
  rest.get(generateURL('moods'), (_, res, ctx) => res(ctx.json(moodsJSON))),
	rest.post(generateURL('register'), (_, res, ctx) => res(ctx.json(registerJSON))),
	rest.post(generateURL('login'), (_, res, ctx) => res(ctx.json(loginJSON))),
	rest.put(generateURL('registerMoods', { id: registerJSON.data.user._id }), (_, res, ctx) => res(ctx.json(registeredMoodsJSON))),
	rest.get(generateURL('soundList'), (_, res, ctx) => res(ctx.json(soundListJSON))),
	rest.put(generateURL('updateProfile', { id: registerJSON.data.user._id }), (_, res, ctx) => res(ctx.json(updatedUserJSON))),
];
