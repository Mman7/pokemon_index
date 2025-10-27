import { ArrowLeftFromLine } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import Description from "./description";
import { Wrapper } from "../../components/wrapper";
import RadarChart from "../../components/chart";
import type { Pokemon } from "pokenode-ts";
import SpiritesShow from "./sprites_show_list";
import EvoChain from "./evo_chain";
import { getPokemonSpeciesByName } from "../../api/pokemon_api";
import { useQuery } from "@tanstack/react-query";

export default function PokemonDetails() {
  const location = useLocation();
  const nav = useNavigate();
  let state: any = location.state;
  const data: Pokemon = state.pokemon;
  const { data: specieData, isLoading } = useQuery({
    queryKey: [`${data.name}Specie`],
    queryFn: () => getPokemonSpeciesByName({ name: data.name }),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // EvoChainId and pokemonId is not the same
  const getEvochainId = () =>
    parseInt(specieData?.evolution_chain.url.toString().split("/")[6] ?? "0");

  if (state === null) return <div>not found</div>;
  // if (error) return <div>Error</div>;

  return (
    <Wrapper>
      <div className="flex flex-col gap-6 p-6">
        <button
          className="btn btn-wide text-xl"
          onClick={() =>
            nav("..", { state: { ...state, lastSeen: data.name } })
          }
        >
          <ArrowLeftFromLine />
          Pokemon Page
        </button>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
          <figure className="flex w-full flex-col items-center gap-6 rounded-2xl p-20 shadow-xl backdrop-brightness-150 dark:backdrop-brightness-120">
            <img
              className="w-full rounded-2xl bg-black/10"
              src={data.sprites.front_default ?? ""}
            />
          </figure>
          {isLoading ? (
            <DescriptionSkeleton />
          ) : (
            <Description pokemonDetails={data} speciesDetails={specieData} />
          )}

          <RadarChart stats={data.stats} pokemonName={data.name} />
          <SpiritesShow data={data} />
        </div>
        <EvoChain name={data.name} EvoChainId={getEvochainId()} />
      </div>
    </Wrapper>
  );
}

export function DescriptionSkeleton() {
  return (
    <div className="shadow-x flex flex-col gap-3.5 rounded-2xl px-10 py-6 *:items-center *:text-center md:*:items-start md:*:text-start dark:backdrop-brightness-130">
      <div className="skeleton h-8 w-28" />
      <div className="skeleton h-8 w-full" />
      <div className="skeleton h-8 w-28" />
      <div className="skeleton h-8 w-28" />
      <div className="flex flex-row flex-wrap gap-3">
        <div className="skeleton h-8 w-28" />
        <div className="skeleton h-8 w-28" />
      </div>
      <div className="skeleton h-8 w-18" />
      <div className="flex flex-row flex-wrap gap-3">
        <div className="skeleton h-8 w-14" />
        <div className="skeleton h-8 w-14" />
      </div>
    </div>
  );
}
