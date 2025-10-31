import type { NamedAPIResource } from "pokenode-ts";
import { Fragment } from "react/jsx-runtime";
import PokemonCard from "../../components/pokemon_item_card";

export default function PokemonList({
  items,
  isShowing,
  refs,
}: {
  items: NamedAPIResource[];
  isShowing: boolean;
  refs: any;
}) {
  return (
    <Fragment>
      {items.map((item: NamedAPIResource, index) => (
        <div
          className={`${isShowing ? "block" : "hidden"}`}
          key={index}
          ref={(el) => {
            refs.current[item.name] = el;
          }}
        >
          <PokemonCard name={item.name} pokemonImgClassName="w-58" />
        </div>
      ))}
    </Fragment>
  );
}
