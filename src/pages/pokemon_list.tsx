import { useState } from "react";
import PokemonCard from "../components/pokemon_item_card";
import { useQuery } from "@tanstack/react-query";
import { PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

const retrieveData = async (limit: number) => {
  var data = await api.listPokemons(0, limit);
  return data.results;
};

export default function PokemonList() {
  const [limit, setlimit] = useState(20);
  const {
    data: listData,
    error,
    isLoading: listLoading,
  } = useQuery({
    queryKey: ["pokemonlist"],
    queryFn: () => retrieveData(limit),
  });

  if (listLoading)
    return (
      <div className="grid h-3/4 justify-items-center">
        <span className="loading loading-ring loading-xl m-auto"></span>
      </div>
    );

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 justify-items-center gap-6 p-6 md:grid-cols-2 md:justify-items-normal lg:grid-cols-3 xl:grid-cols-5">
      {(listData || []).map((pokemon: any) => (
        <PokemonCard key={pokemon.id ?? pokemon.name} name={pokemon.name} />
      ))}
    </div>
  );
}
