import { ArrowLeftFromLine, Volume1 } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import Description from "./description";
import { Wrapper } from "../../components/wrapper";
import Charts from "../../components/chart";
import SpiritesShow from "./sprites_show_list";
import EvoChain from "./evo_chain";
import { getPokemonSpeciesByName } from "../../api/pokemon_api";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import type { Pokemon } from "pokenode-ts";

export default function PokemonDetails() {
  const location = useLocation();
  const nav = useNavigate();
  let state: any = location.state;
  const data: Pokemon | any = state.pokemon;
  const { data: specieData } = useQuery({
    queryKey: [`${data.name}Specie`],
    queryFn: () => getPokemonSpeciesByName({ name: data.name }),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // EvoChainId and pokemonId is not the same
  const getEvochainId = () =>
    parseInt(specieData?.evolution_chain.url.toString().split("/")[6] ?? "0");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play();
    }
  };

  if (state === null) return <div>not found</div>;

  const baseStats: number[] = [
    data.stats[0].base_stat,
    data.stats[1].base_stat,
    data.stats[2].base_stat,
    data.stats[3].base_stat,
    data.stats[4].base_stat,
    data.stats[5].base_stat,
  ];

  const statsLabel = [
    data.stats[0].stat.name.toUpperCase(),
    data.stats[1].stat.name.toUpperCase(),
    data.stats[2].stat.name.toUpperCase(),
    data.stats[3].stat.name.toUpperCase(),
    data.stats[4].stat.name.toUpperCase(),
    data.stats[5].stat.name.toUpperCase(),
  ];

  return (
    <Wrapper>
      <div className="flex flex-col gap-6 p-6">
        <button
          className="btn btn-wide text-xl"
          onClick={() => nav("..", { state: { ...state } })}
        >
          <ArrowLeftFromLine />
          Pokemon Page
        </button>
        <main className="flex flex-col gap-6 md:grid md:grid-cols-2">
          <div className="col-span-2 flex flex-col items-center justify-center rounded-md p-8 md:flex-row md:justify-around dark:backdrop-brightness-120">
            <figure className="rounded-2xl">
              <div className="indicator">
                <audio ref={audioRef} src={data.cries.latest} />
                <span
                  onClick={() => playSound()}
                  className="indicator-item indicator-start indicator-bottom badge badge-primary px-1.75 py-3.5 pr-1 hover:cursor-pointer"
                >
                  <Volume1 />
                </span>
                <img
                  src={data.sprites.front_default ?? ""}
                  className="grid w-64 place-items-center rounded-xl bg-black/10"
                />
              </div>
            </figure>
            <Description pokemonDetails={data} speciesDetails={specieData} />
          </div>
          <Charts
            labelTitle="Pokemon Stats"
            stats={baseStats}
            ItemName={data.name}
            chartType="radar"
            statsLabel={statsLabel}
          />

          <SpiritesShow data={data} />
        </main>
        <EvoChain name={data.name} EvoChainId={getEvochainId()} />
      </div>
    </Wrapper>
  );
}
