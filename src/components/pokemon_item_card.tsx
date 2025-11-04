import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router";
import { TypeBadges } from "./type_badges";
import { getPokemonDetailByName } from "../api/pokemon_api";
import ItemCardSkeleton from "./item_card_skeleton";
import ItemImg from "./item_img";
import { useInView } from "react-intersection-observer";

interface PokemonCardProps {
  name: string;
  pokemonImgClassName: string;
  itemClassName?: string;
}

export default function PokemonCard({
  name,
  pokemonImgClassName,
  itemClassName,
}: PokemonCardProps) {
  const location = useLocation();
  const {
    data: baseData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [name],
    queryFn: () => getPokemonDetailByName({ name }),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once per item
    rootMargin: "200px", // Render slightly before it enters view
  });

  if (isLoading) return <ItemCardSkeleton />;
  if (error && error.message == "Request failed with status code 404")
    return (
      <div className="grid h-3/4 justify-items-center">Pokemon not found</div>
    );
  if (error)
    return <div className="grid h-3/4 justify-items-center">error.message</div>;
  return (
    <Link
      to={`/pokemon/${name}`}
      state={{
        ...location.state,
        pokemon: baseData,
      }}
    >
      <div
        ref={ref}
        className={`${itemClassName} card rounded-xl shadow-lg backdrop-brightness-120 transition-transform duration-200 hover:scale-105 hover:cursor-pointer hover:backdrop-brightness-140 active:scale-95`}
      >
        {inView && isLoading ? (
          <ItemCardSkeleton />
        ) : (
          <figure className="p-8">
            <div className={`indicator rounded-2xl bg-black/5`}>
              <div className="indicator-item indicator-center badge flex gap-5 border-0 bg-transparent">
                {baseData?.types.map((pokemon) => (
                  <TypeBadges
                    fontSize="text-base"
                    key={pokemon.type.name}
                    type={pokemon.type.name}
                  />
                ))}
              </div>
              <span
                className={`${name.length > 10 && "text-xs"} indicator-item indicator-bottom indicator-center badge bg-gray-500 px-3 py-3.5 text-base font-medium text-white capitalize dark:bg-gray-600`}
              >
                {name}
              </span>
              <span
                className={`${name.length > 13 && "hidden"} ${name.length < 13 && "text-xl"} indicator-item indicator-start indicator-bottom badge bg-gray-500 p-1.5 text-xs font-medium text-gray-300 dark:bg-gray-600`}
              >
                #{baseData?.id}
              </span>
              <ItemImg
                imgClassName={pokemonImgClassName}
                src={baseData?.sprites.front_default ?? undefined}
                alt={baseData?.name}
              />
            </div>
          </figure>
        )}
      </div>
    </Link>
  );
}
