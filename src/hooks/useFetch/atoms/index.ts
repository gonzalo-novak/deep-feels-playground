import { atom } from 'jotai';
import { TError } from '..';

export const isLoading = atom<boolean>(false);
export const isFetchError = atom<TError['data'] | null>(null);
