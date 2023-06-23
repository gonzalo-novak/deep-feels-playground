import { atom } from "jotai";
import { TMood } from "./moods";

export type TUser = {
	_id: string;
	photo: string;
	name: string;
	email: string;
	moods: TMood[];
};

export const userAtom = atom<TUser>({
	_id: '',
	photo: '',
	name: '',
	email: '',
	moods: [],
});
