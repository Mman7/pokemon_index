import { ArrowLeftFromLine } from "lucide-react";
import type { Pokemon } from "pokenode-ts";
import { Link, useLocation } from "react-router";
import Description from "./description";

export default function PokemonDetails() {
  const location = useLocation();
  const data: Pokemon = location.state.pokemon;

  return (
    <div className="p-6">
      <Link to="/pokemon" className="btn-wide flex items-center gap-5">
        <button className="btn btn-wide text-xl">
          <ArrowLeftFromLine />
          Pokemon Page
        </button>
      </Link>
      <div className="flex gap-6 p-6">
        <img
          className="w-50 rounded-2xl shadow-xl dark:backdrop-brightness-120"
          src={data?.sprites.front_default ?? ""}
        />
        {/* <Description
          id={data.id}
          height={data.height}
          weight={data.weight}
          name={data.name}
          baseExperience={data.base_experience}
        /> */}
      </div>
    </div>
  );
}
