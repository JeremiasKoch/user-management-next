import { Character } from '@/api';
import { create } from 'zustand';

type CharactersState = {
  characters: Character[];
  setCharacters: (chars: Character[]) => void;
  clearCharacters: () => void;
};

const initialState: Pick<CharactersState, 'characters'> = {
  characters: [],
};

export const useCharactersStore = create<CharactersState>((set) => ({
  ...initialState,
  setCharacters: (chars) => set({ characters: chars }),
  clearCharacters: () => set({ ...initialState }),
}));
