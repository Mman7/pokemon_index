import { PokemonClient, EvolutionClient, type Pokemon } from "pokenode-ts";

const api = new PokemonClient();
const evo = new EvolutionClient();

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

export const getPokemonSpeciesByName = async ({ name }: { name: string }) => {
  const data = await api.getPokemonSpeciesByName(name);
  return data;
};

export const getEvoChainsById = async ({ id }: { id: number }) => {
  const data = await evo.getEvolutionChainById(id);
  return data;
};

export const getAllPokemonNames = async () => {
  const data = await api.listPokemons(0, 100000);
  return data;
};
