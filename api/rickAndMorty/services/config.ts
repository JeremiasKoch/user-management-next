export const rickAndMortyEndpoint = {
  getCharacters: (page: number) => `/character?page=${page}`,
  getFilteredCharactersByName: (name: string, page: number) =>
    `/character?page=${page}&name=${name}`,
};
