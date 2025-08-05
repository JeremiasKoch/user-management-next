import {
  axiosRequest,
  rickAndMortyEndpoint,
  CharacterListResponse,
  Character,
} from '@/api';
import { MAX_CHARACTERS_PER_PAGE } from '../constant/characters';

export const fetchCharacters = async (page: number = 1) => {
  return axiosRequest<CharacterListResponse>({
    method: 'get',
    url: rickAndMortyEndpoint.getCharacters(page),
  });
};

export const fetchFilteredCharactersByName = async (
  name: string
): Promise<Character[]> => {
  let page = 1;
  const all: Character[] = [];

  while (all.length < MAX_CHARACTERS_PER_PAGE) {
    const data = await axiosRequest<CharacterListResponse>({
      method: 'get',
      url: rickAndMortyEndpoint.getFilteredCharactersByName(name, page),
    });

    all.push(...data.results);

    if (!data.info.next) break;
    page++;
  }

  return all.slice(0, MAX_CHARACTERS_PER_PAGE);
};
