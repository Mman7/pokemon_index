import { PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

export const retrieveData = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}) => {
  const data = await api.listPokemons(pageParam, 20);
  return data;
};
