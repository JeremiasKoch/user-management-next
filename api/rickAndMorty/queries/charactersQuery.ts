import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  CharacterListResponse,
  fetchCharacters,
  fetchFilteredCharactersByName,
} from '@/api';

export const useCharactersQuery = (page: number) => {
  return useQuery<CharacterListResponse>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};

export const useFilteredCharactersQuery = (name: string) => {
  return useQuery({
    queryKey: ['filtered-characters-by-name', name],
    queryFn: () => fetchFilteredCharactersByName(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 5,
  });
};
