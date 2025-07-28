import { create } from 'zustand';

type ErrorT = {
  title: string;
  message: string;
};

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
