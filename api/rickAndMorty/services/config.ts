export const rickAndMortyEndpoint = {
  getCharacter: (id: string) => `/character/${id}`,
  getCharacters: (page: number) => `/character?page=${page}`,
  getFilteredCharactersByName: (name: string, page: number) =>
    `/character?page=${page}&name=${name}`,
};
