import {
  PokemonClient,
  EvolutionClient,
  ItemClient,
  BerryClient,
  type Pokemon,
} from "pokenode-ts";

const api = new PokemonClient();
const evo = new EvolutionClient();
const item = new ItemClient();
const berry = new BerryClient();

export const getPokemonsList = async ({
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

export const getItemList = async ({ pageParam = 0 }: { pageParam: number }) => {
  const data = await item.listItems(pageParam, 20);
  return data;
};

export const getAllItems = async () => {
  const data = await item.listItems(0, 100000);
  return data;
};

export const getItemByName = async ({ name }: { name: string }) => {
  const data = await item.getItemByName(name);
  return data;
};

export const getAllberry = async () => {
  const data = await berry.listBerries(0, 100000);
  return data;
};

export const getBerryList = async ({
  pageParam = 0,
}: {
  pageParam: number;
}) => {
  const data = await berry.listBerries(pageParam, 20);
  return data;
};

export const getBerryByName = async ({ name }: { name: string }) => {
  const data = await berry.getBerryByName(name);
  return data;
};

enum Path {
  pokemon = "/pokemon",
  item = "/item",
  berry = "/berry",
}

export const namesListByCondition = async ({ path }: { path: string }) => {
  switch (path) {
    case Path.pokemon:
      return getAllPokemonNames();
    case Path.item:
      return getAllItems();
    case Path.berry:
      return getAllberry();
    default:
      return null;
      break;
  }
};
