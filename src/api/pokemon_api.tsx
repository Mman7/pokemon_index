import { PokemonClient, type Pokemon } from "pokenode-ts";

const api = new PokemonClient();

export const getListPokemons = async ({
  pageParam = 0,
}: {
  pageParam: number;
}) => {
  const data = await api.listPokemons(pageParam, 20);
  return data;
};

export const getPokemonDetailByName = async ({ name }: { name: string }) => {
  const data: Pokemon = await api.getPokemonByName(name);
  return data;
};

export const getPokemonDetailByID = async ({ id }: { id: number }) => {
  const data: Pokemon = await api.getPokemonById(id);
  return data;
};
