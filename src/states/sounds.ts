import { atom } from "jotai";

export type TSound = {
	_id: string;
	name: string;
	duration: number;
	location: string;
	image: string;
	avgColor: string;
};

export const soundsAtom = atom<TSound[]>([]);
export const selectedSound = atom<string>("")
