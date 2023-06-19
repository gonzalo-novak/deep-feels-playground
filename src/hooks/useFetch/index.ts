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

const context = '/api';

export const useFetch = <A = {}>(endpoint: keyof typeof ENDPOINTS, atom: PrimitiveAtom<A>, options?: RequestInit | undefined) => {
	const setAtom = useSetAtom(atom);
	const setLoading = useSetAtom(isLoading);
	const setError = useSetAtom(isFetchError);

	const getStuff = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(context + ENDPOINTS[endpoint], options);
			const { ok, data }: TResponse<A> = await res.json();
			if(!ok) throw data;
			setAtom(data);
		} catch (error: any) {
			if(error.message)
			setError(error as TError);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getStuff();
	}, []);
};
