import { useQuery } from "@tanstack/react-query";
import { getEvoChainsById } from "../../api/pokemon_api";
import type { EvolutionChain } from "pokenode-ts";
import { ChevronDown, ChevronRight } from "lucide-react";
import PokemonCard from "../../components/pokemon_item_card";
import { Fragment } from "react/jsx-runtime";

export default function EvoChain({
  name,
  EvoChainId,
}: {
  name: string;
  EvoChainId: number;
}) {
  const { data: chainData, isLoading: isLoading1 } = useQuery<EvolutionChain>({
    queryKey: [`${name}Evo`, EvoChainId],
    queryFn: () => getEvoChainsById({ id: EvoChainId }),
    enabled: EvoChainId !== 0,
  });

  let current = chainData?.chain;
  const evolutions: any[] = [];
  while (current) {
    // push the current Pokémon's name
    if (current.species?.name) evolutions.push(current.species.name);
    // move to the next evolution (first branch)
    current = current.evolves_to?.[0];
  }
  if (isLoading1) <div> Loading...</div>;

  return (
    <div className={`${evolutions.length == 0 && "hidden"} `}>
      <h1 className="text-center text-2xl font-bold">Evolution</h1>
      <div className="flex w-full flex-col items-center justify-center pt-6 lg:flex-row">
        {evolutions.map((pokemonEvo, index) => (
          <Fragment key={index}>
            <PokemonCard
              itemClassName={`${pokemonEvo == name && "border-1"}`}
              key={pokemonEvo}
              name={pokemonEvo}
              pokemonImgClassName="w-34"
            />
            <div className="last:hidden">
              <ChevronRight className={`m-2 hidden size-10 lg:block`} />
              <ChevronDown className={`m-2 size-10 lg:hidden`} />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
