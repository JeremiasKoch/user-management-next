import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  CharacterListResponse,
  fetchCharacters,
  fetchFilteredCharacters,
} from '@/api';
import { useDebounce } from '@/utils/debounce';

export const useCharactersQuery = (page: number) => {
  return useQuery<CharacterListResponse>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};

export const useFilteredCharactersQuery = (search: string) => {
  const debouncedSearch = useDebounce(search, 3000);

  return useQuery({
    queryKey: ['characters-filtered', debouncedSearch],
    queryFn: () => fetchFilteredCharacters(debouncedSearch),
    enabled: !!debouncedSearch,
  });
};
