import { atom } from "jotai";

export type TMood = {
	_id: string;
	name: string;
	icon: string;
}

export const moodsAtom = atom<TMood[]>([]);
