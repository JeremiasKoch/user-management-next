import { useQuery } from '@tanstack/react-query';
import { fetchCharacter } from '../services/characterService';

export const useCharacterQuery = (id: string) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
  });
};
