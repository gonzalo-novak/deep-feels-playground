import { atom } from "jotai";
import { TMood } from "./moods";

export type TUser = {
	_id: string;
	photo: string;
	name: string;
	email: string;
	moods: TMood[];
	hasSelectedTheirMoods?: boolean;
};

export const userAtomRaw = atom<TUser>(
	JSON.parse(
		localStorage.getItem('user') ||
		JSON.stringify(
			{
				_id: '',
				photo: '',
				name: '',
				email: '',
				moods: [],
			}
		)
	) as TUser
);

export const userAtom = atom(
  (get) => get(userAtomRaw),
  (get, set, newStr: TUser) => {
    set(userAtomRaw, newStr)
    localStorage.setItem('user', JSON.stringify(newStr))
  }
)
