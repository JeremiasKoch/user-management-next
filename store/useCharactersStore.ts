import { Character } from '@/api';
import { create } from 'zustand';

type CharactersState = {
  characters: Character[];
  setCharacters: (chars: Character[]) => void;
  clearCharacters: () => void;
};

export const useCharactersStore = create<CharactersState>((set) => ({
  characters: [],
  setCharacters: (chars) => set({ characters: chars }),
  clearCharacters: () => set({ characters: [] }),
}));
