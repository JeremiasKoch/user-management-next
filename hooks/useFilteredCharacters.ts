'use client';

import { useMemo } from 'react';
import { CharacterListResponse } from '@/api';
import { useRickAndMortyFilterStore } from '@/store/rickAndMortyFilters';
import { useDebounce } from '@/utils/debounce';

export function useFilteredCharacters(
  tableId: string,
  data: CharacterListResponse
) {
  const allData = useMemo(() => data?.results || [], [data]);

  const filtersMap = useRickAndMortyFilterStore((state) => state.filters);
  const filters = filtersMap[tableId] || { name: '', status: '', gender: '' };

  const nameFilter = useDebounce(filters.name.toLowerCase(), 400);
  const statusFilter = filters.status.toLowerCase();
  const genderFilter = filters.gender.toLowerCase();

  const hasFilters = !!nameFilter || !!statusFilter || !!genderFilter;

  const paginatedData = useMemo(() => {
    if (!hasFilters) return allData;

    return allData.filter((character) => {
      const matchesName = nameFilter
        ? character.name.toLowerCase().includes(nameFilter)
        : true;
      const matchesStatus = statusFilter
        ? character.status.toLowerCase() === statusFilter
        : true;
      const matchesGender = genderFilter
        ? character.gender.toLowerCase() === genderFilter
        : true;

      return matchesName && matchesStatus && matchesGender;
    });
  }, [allData, nameFilter, statusFilter, genderFilter, hasFilters]);

  return {
    paginatedData,
    hasFilters,
  };
}
