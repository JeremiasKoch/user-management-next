import { create } from 'zustand';

type PaginationState = {
  pages: Record<string, number>;
  setPage: (tableId: string, page: number) => void;
  visibility: Record<string, boolean>;
  toggleVisibility: (tableId: string) => void;
};

export const usePaginationStore = create<PaginationState>((set) => ({
  pages: {},
  setPage: (tableId, page) =>
    set((state) => ({
      pages: {
        ...state.pages,
        [tableId]: page,
      },
    })),
  visibility: {},
  toggleVisibility: (tableId) =>
    set((state) => ({
      visibility: {
        ...state.visibility,
        [tableId]: !state.visibility[tableId],
      },
    })),
}));
