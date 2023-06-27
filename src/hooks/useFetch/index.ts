import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { ENDPOINTS } from "../../utils/endpoints";
import { isFetchError, isLoading } from "./atoms";
import { sessionAtomWithPersistence } from "../../states/session";
import { generateURL } from "../../mocks/handlers";

export type TResponse<A> = {
	ok: boolean,
	data: A;
};

export type TError = {
	ok: false,
	data: { message: string; };
};

type FetchOptions = Omit<RequestInit, 'body' | 'params'> & { body: any, useCredentials?: boolean; params?: { [k: string] : string | boolean | number } } ;

export const apiContext = '/api';
export const useFetch = <A = {}>(
	endpoint: keyof typeof ENDPOINTS | null,
	onFinishFetch: ((response: A) => void),
	options?: FetchOptions | undefined
) => {
	const setLoading = useSetAtom(isLoading);
	const setError = useSetAtom(isFetchError);
	const session = useAtomValue(sessionAtomWithPersistence);

	const getStuff = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(
				generateURL(endpoint!, options?.params && options.params),
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
			onFinishFetch(data);
		} catch (error: any) {
			if(error.message) setError(error as TError['data']);
		} finally {
			setLoading(false);
		}
	}, [endpoint, options]);

	useEffect(() => {
		if(endpoint) getStuff();
	}, [endpoint]);
};
