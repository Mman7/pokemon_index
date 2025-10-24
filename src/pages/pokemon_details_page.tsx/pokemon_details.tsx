import { ArrowLeftFromLine } from "lucide-react";
import { Link, useLocation } from "react-router";
import Description from "./description";
import { Wrapper } from "../../components/wrapper";
import RadarChart from "../../components/chart";
import type { Pokemon } from "pokenode-ts";
import SpiritesShow from "./sprites_show_list";

//TODO add more content

export default function PokemonDetails() {
  const location = useLocation();
  let state: any = location.state;

  if (state === null) return <div>not found</div>;
  const data: Pokemon = state.pokemon;

  return (
    <Wrapper>
      <div className="flex flex-col">
        <Link
          className="pl-6"
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
        <div className="flex flex-col gap-10 p-6 md:grid md:grid-cols-2">
          <figure className="flex flex-col gap-6">
            <img
              className="w-full rounded-2xl shadow-xl dark:backdrop-brightness-90"
              src={data.sprites.front_default ?? ""}
            />
          </figure>
          <Description pokemonDetails={data} />
          <div className="gap-6 rounded-2xl p-6 shadow-xl backdrop-brightness-90">
            <RadarChart stats={data.stats} pokemonName={data.name} />
          </div>
          <SpiritesShow data={data} />
        </div>
      </div>
    </Wrapper>
  );
}
