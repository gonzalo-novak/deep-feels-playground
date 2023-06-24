import { atom } from "jotai";

const sessionAtom = atom<string>(localStorage.getItem('session') ?? "");
export const sessionAtomWithPersistence = atom(
  (get) => get(sessionAtom),
  (get, set, newStr: string) => {
    set(sessionAtom, newStr)
    localStorage.setItem('session', newStr)
  }
)
