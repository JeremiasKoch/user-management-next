import { create } from 'zustand';
import { ErrorT } from './types';

type ErrorStoreT = {
  error: ErrorT | null;
  setError: (error: ErrorT) => void;
  clearError: () => void;
};

export const useErrorStore = create<ErrorStoreT>((set) => ({
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
