import { PrimitiveAtom, atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { ENDPOINTS } from "../../utils/endpoints";
import { isFetchError, isLoading } from "./atoms";
import { sessionAtomWithPersistence } from "../../states/session";

export type TResponse<A> = {
	ok: boolean,
	data: A;
};

export type TError = {
	ok: false,
	data: { message: string; };
};

type FetchOptions = Omit<RequestInit, 'body'> & { body: any, useCredentials?: boolean; } ;

export const apiContext = '/api';

const dummyAtom = atom(null);

export const useFetch = <A = {}>(
	endpoint: keyof typeof ENDPOINTS | null,
	atom: PrimitiveAtom<A> | ((response: A) => void),
	options?: FetchOptions | undefined
) => {
	const isAtomDelegated = (typeof atom === 'function');
	const setAtom = useSetAtom(isAtomDelegated ? dummyAtom : atom);
	const setLoading = useSetAtom(isLoading);
	const setError = useSetAtom(isFetchError);
	const session = useAtomValue(sessionAtomWithPersistence);

	const getStuff = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(
				// We'll omit this line as we don't need to test it because it's
				// only used in testing environments
				/* c8 ignore next */
				(process.env?.TEST_API_HOST || '')
				+ apiContext
				+ ENDPOINTS[endpoint!],
				{
					...options,
					headers: {
						'Content-Type': 'application/json',
						...(options && options.useCredentials && { Authorization: session })
					},
					...(options && options.body && { body: JSON.stringify(options.body) })
				}
			);
			const { ok, data }: TResponse<A> = await res.json();
			if(!ok) throw data;
			if(isAtomDelegated) return atom(data);
			setAtom(data);
		} catch (error: any) {
			if(error.message) setError(error as TError['data']);
		} finally {
			setLoading(false);
		}
	}, [endpoint]);

	useEffect(() => {
		if(endpoint) getStuff();
	}, [endpoint]);
};
