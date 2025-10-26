import { ArrowLeftFromLine } from "lucide-react";
import { Link, useLocation } from "react-router";
import Description from "./description";
import { Wrapper } from "../../components/wrapper";
import RadarChart from "../../components/chart";
import type { Pokemon } from "pokenode-ts";
import SpiritesShow from "./sprites_show_list";
// import EvoChain from "./evo_chain";
import { getPokemonSpeciesByName } from "../../api/pokemon_api";
import { useQuery } from "@tanstack/react-query";

export default function PokemonDetails() {
  const location = useLocation();
  let state: any = location.state;
  const data: Pokemon = state.pokemon;
  const {
    data: specieData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`${data.name}Specie`],
    queryFn: () => getPokemonSpeciesByName({ name: data.name }),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (state === null) return <div>not found</div>;
  console.log(data);
  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <Wrapper>
      <div className="flex flex-col">
        <Link
          className="w-fit pl-6"
          to={"/pokemon"}
          state={{
            pokemon: data.name,
          }}
        >
          <button className="btn btn-wide text-xl">
            <ArrowLeftFromLine />
            Pokemon Page
          </button>
        </Link>
        <div className="flex flex-col gap-6 p-6 md:grid md:grid-cols-2">
          <figure className="flex flex-col items-center gap-6">
            <img
              className="w-full rounded-2xl shadow-xl backdrop-brightness-95 dark:backdrop-brightness-90"
              src={data.sprites.front_default ?? ""}
            />
          </figure>
          <Description pokemonDetails={data} speciesDetails={specieData} />
          <div className="w-full gap-6 rounded-2xl p-6 shadow-xl backdrop-brightness-95">
            <RadarChart stats={data.stats} pokemonName={data.name} />
          </div>
          <SpiritesShow data={data} />
        </div>
        {/* <EvoChain name={data.name} id={data.id} /> */}
      </div>
    </Wrapper>
  );
}
