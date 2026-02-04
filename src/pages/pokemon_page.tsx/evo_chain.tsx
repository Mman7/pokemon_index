import { useQuery } from "@tanstack/react-query";
import { getEvoChainsById } from "../../api/pokemon_api";
import type { EvolutionChain, NamedAPIResource } from "pokenode-ts";
import { ChevronDown, ChevronRight } from "lucide-react";
import PokemonCard from "../../components/pokemon_item_card";
import { Fragment } from "react/jsx-runtime";

// Skeleton component for a loading Pokemon card
function PokemonCardSkeleton() {
  return (
    <div className="w-full animate-pulse xl:size-70">
      <div className="mb-2 h-40 w-full rounded-lg bg-gray-300 dark:bg-gray-700"></div>
      <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
    </div>
  );
}

export default function EvoChain({
  name,
  EvoChainId,
}: {
  name: string;
  EvoChainId: number;
}) {
  const { data, isLoading } = useQuery<EvolutionChain>({
    queryKey: [`${name}Evo`, EvoChainId],
    queryFn: () => getEvoChainsById({ id: EvoChainId }),
    enabled: EvoChainId !== 0,
  });

  let current = data?.chain;
  const evolutions: NamedAPIResource[] = []; // Fixed type definition
  while (current) {
    // push the current Pokémon's name
    if (current.species?.name) evolutions.push(current.species);
    // move to the next evolution (first branch)
    current = current.evolves_to?.[0];
  }

  if (isLoading)
    return (
      <div className="flex w-full flex-col items-center justify-center pt-6 xl:flex-row">
        {[...Array(3)].map((_, index) => (
          <Fragment key={index}>
            <PokemonCardSkeleton />
            <div className="last:hidden">
              <ChevronRight className="m-2 hidden size-10 xl:block" />
              <ChevronDown className="m-2 size-10 xl:hidden" />
            </div>
          </Fragment>
        ))}
      </div>
    );

  return (
    <div className={`${evolutions?.length == 0 && "hidden"} `}>
      <h1 className="text-center text-2xl font-bold">Evolution</h1>
      <div className="flex w-full flex-col items-center justify-center pt-6 xl:flex-row">
        {evolutions?.map((pokemonEvo: NamedAPIResource, index) => (
          <Fragment key={index}>
            <div className="w-full xl:size-70">
              <PokemonCard
                itemClassName={`${pokemonEvo.name == name && "border-1"}`}
                key={pokemonEvo.name}
                item={pokemonEvo}
              />
            </div>
            <div className="last:hidden">
              <ChevronRight className={`m-2 hidden size-10 xl:block`} />
              <ChevronDown className={`m-2 size-10 xl:hidden`} />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
