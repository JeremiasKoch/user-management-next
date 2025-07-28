'use client';

import { create } from 'zustand';
import { GenderFilter, StatusFilter } from '@/types';

type FilterSet = {
  name: string;
  status: StatusFilter;
  gender: GenderFilter;
};

type RickAndMortyFilterStore = {
  filters: Record<string, FilterSet>;
  setFilter: (tableId: string, key: keyof FilterSet, value: string) => void;
};

export const useRickAndMortyFilterStore = create<RickAndMortyFilterStore>(
  (set, get) => ({
    filters: {},
    setFilter: (tableId, key, value) => {
      const prev = get().filters[tableId] || {
        name: '',
        status: '',
        gender: '',
      };
      set((state) => ({
        filters: {
          ...state.filters,
          [tableId]: {
            ...prev,
            [key]: value,
          },
        },
      }));
    },
  })
);
