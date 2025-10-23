import { PokemonClient, type Pokemon } from "pokenode-ts";

const api = new PokemonClient();

export const retrieveData = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}) => {
  const data = await api.listPokemons(pageParam, 20);
  return data;
};

export const getPokemonDetail = async (name: string) => {
  const data: Pokemon = await api.getPokemonByName(name);
  return data;
};
