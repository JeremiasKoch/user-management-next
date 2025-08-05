import { axiosRequest } from '@/api/axiosConfig';
import { rickAndMortyEndpoint } from './config';
import { Character } from '../types';

export const fetchCharacter = async (id: string) => {
  return axiosRequest<Character>({
    method: 'get',
    url: rickAndMortyEndpoint.getCharacter(id),
  });
};
