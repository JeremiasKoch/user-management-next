import {
  axiosRequest,
  rickAndMortyEndpoint,
  CharacterListResponse,
} from '@/api';

export const fetchCharacters = async (page: number = 1) => {
  return axiosRequest<CharacterListResponse>({
    method: 'get',
    url: rickAndMortyEndpoint.getCharacters(page),
  });
};

export const fetchFilteredCharacters = async (name: string) => {
  return axiosRequest<CharacterListResponse>({
    method: 'get',
    url: rickAndMortyEndpoint.getFilteredCharacters(name),
  });
};
