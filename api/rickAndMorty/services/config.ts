export const rickAndMortyEndpoint = {
  getCharacters: (page: number) => `/character?page=${page}`,
  getFilteredCharacters: (search: string) => `/character?name=${search}`,
};
