import { rest } from 'msw'
import { ENDPOINTS } from '../utils/endpoints'
import { apiContext } from '../hooks/useFetch';

// Mocks
import moodsJSON from './moods.mock.json';
import registerJSON from './register.mock.json';
import loginJSON from './login.mock.json';

export const generateURL = (endpoint: keyof typeof ENDPOINTS) => process.env.TEST_API_HOST + apiContext + ENDPOINTS[endpoint];

export const handlers = [
  rest.get(generateURL('moods'), (_, res, ctx) => res(ctx.json(moodsJSON))),
	rest.post(generateURL('register'), (_, res, ctx) => res(ctx.json(registerJSON))),
	rest.post(generateURL('login'), (_, res, ctx) => res(ctx.json(loginJSON))),
];
