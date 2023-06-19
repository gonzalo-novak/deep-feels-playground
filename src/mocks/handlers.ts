import { rest } from 'msw'
import { ENDPOINTS } from '../utils/endpoints'

// Mocks
import moodsJSON from './moods.mock.json';
import { apiContext } from '../hooks/useFetch';


export const generateURL = (endpoint: keyof typeof ENDPOINTS) => process.env.TEST_API_HOST + apiContext + ENDPOINTS[endpoint];

export const handlers = [
  rest.get(generateURL('moods'), (_, res, ctx) => res(ctx.json(moodsJSON))),
];
