import React from "react"; // <-- Make sure React is imported
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router";
import { TypeBadges, typeClassMap } from "./type_badges";
import { getPokemonDetailByName } from "../api/pokemon_api";
import ItemCardSkeleton from "./item_card_skeleton";
import ItemImg from "./item_img";
import { useInView } from "react-intersection-observer";
import type { NamedAPIResource } from "pokenode-ts";

interface PokemonCardProps {
  item: NamedAPIResource;
  pokemonImgClassName?: string;
  itemClassName?: string;
}

function PokemonCardComponent({ item, itemClassName }: PokemonCardProps) {
  const location = useLocation();

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  const { data, error, isLoading } = useQuery({
    queryKey: [item.name],
    queryFn: () => getPokemonDetailByName({ name: item.name }),
    enabled: inView, // only fetch when in view
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <ItemCardSkeleton />;
  if (error && error.message === "Request failed with status code 404")
    return (
      <div className="grid h-3/4 justify-items-center">Pokemon not found</div>
    );
  if (error)
    return (
      <div className="grid h-3/4 justify-items-center">{error.message}</div>
    );
  return (
    <Link
      to={`/pokemon/${item.name}`}
      state={{
        ...location.state,
        pokemon: data,
      }}
    >
      <div
        ref={ref}
        className={`${itemClassName} card rounded-xl shadow-md backdrop-brightness-120 transition-transform duration-200 hover:scale-105 hover:cursor-pointer hover:backdrop-brightness-140 active:scale-95`}
      >
        {inView && isLoading ? (
          <ItemCardSkeleton />
        ) : (
          <figure className="p-8">
            <div className="indicator rounded-2xl bg-black/5">
              <div className="indicator-item indicator-center badge flex gap-5 border-0 bg-transparent">
                {data?.types.map((pokemon) => (
                  <TypeBadges
                    fontSize="text-base"
                    key={pokemon.type.name}
                    type={pokemon.type.name}
                  />
                ))}
              </div>
              <span
                className={`${item.name.length > 10 && "text-xs"} ${typeClassMap[data?.types[0]?.type?.name ?? "border-white"]} indicator-item indicator-bottom indicator-center badge bg-gray-600! px-3 py-3.5 text-base font-medium text-white capitalize`}
              >
                {item.name}
              </span>
              <span
                className={`${item.name.length > 13 && "hidden"} ${
                  item.name.length < 13 && "text-xl"
                } indicator-item indicator-start indicator-bottom badge bg-gray-600 p-1.5 text-xs font-medium text-gray-300`}
              >
                #{data?.id}
              </span>
              <ItemImg
                imgClassName="w-64!"
                src={data?.sprites.front_default ?? undefined}
                alt={data?.name}
              />
            </div>
          </figure>
        )}
      </div>
    </Link>
  );
}

// Wrap with React.memo
export default React.memo(PokemonCardComponent, (prevProps, nextProps) => {
  // Only re-render if the item name or classes change
  return (
    prevProps.item.name === nextProps.item.name &&
    prevProps.itemClassName === nextProps.itemClassName &&
    prevProps.pokemonImgClassName === nextProps.pokemonImgClassName
  );
});
