import { PrimitiveAtom, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { ENDPOINTS } from "../../utils/endpoints";
import { isFetchError, isLoading } from "./atoms";

export type TResponse<A> = {
	ok: boolean,
	data: A;
};

export type TError = {
	ok: false,
	data: { message: string; };
};

export const apiContext = '/api';

export const useFetch = <A = {}>(endpoint: keyof typeof ENDPOINTS, atom: PrimitiveAtom<A>, options?: RequestInit | undefined) => {
	const setAtom = useSetAtom(atom);
	const setLoading = useSetAtom(isLoading);
	const setError = useSetAtom(isFetchError);

	const getStuff = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(
				// We'll omit this line as we don't need to test it because it's
				// only used in testing environments
				/* c8 ignore next */ 
				(process.env.TEST_API_HOST || '') 
				+ apiContext 
				+ ENDPOINTS[endpoint], 
				options
			);
			const { ok, data }: TResponse<A> = await res.json();
			if(!ok) throw data;
			setAtom(data);
		} catch (error: any) {
			if(error.message) setError(error as TError['data']);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getStuff();
	}, []);
};
