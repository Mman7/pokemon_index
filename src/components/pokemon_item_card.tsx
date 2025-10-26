import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router";
import { TypeBadges } from "./type_badges";
import { getPokemonDetailByName } from "../api/pokemon_api";

export default function PokemonCard({
  name,
  pokemonClassName,
}: {
  name: string;
  isSearch?: boolean | null;
  pokemonClassName: string;
}) {
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

  if (isLoading) {
    const defaultStyle = "skeleton bg-gray-300 dark:bg-gray-700";
    return (
      <div className="flex w-52 flex-col gap-4">
        <div className={`${defaultStyle} h-32 w-full`}></div>
        <div className={`${defaultStyle} h-8 w-full`}></div>
        <div className={`${defaultStyle} h-8 w-full`}></div>
      </div>
    );
  }

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
        pokemon: baseData,
      }}
    >
      <div className="card rounded-xl shadow-lg backdrop-brightness-120 duration-1000 hover:cursor-pointer hover:backdrop-brightness-140">
        <figure className="p-8">
          <div className="indicator rounded-2xl bg-black/5">
            <div className="indicator-item indicator-center badge flex gap-5 border-0 bg-transparent">
              {baseData?.types.map((a) => (
                <TypeBadges
                  fontSize="text-base"
                  key={a.type.name}
                  type={a.type.name}
                />
              ))}
            </div>
            <span
              className={`${name.length > 10 && "text-xs"} indicator-item indicator-bottom indicator-center badge bg-gray-500 px-3 py-3.5 text-base font-medium text-white capitalize dark:bg-gray-600`}
            >
              {name}
            </span>
            <span className="indicator-item indicator-start indicator-bottom badge bg-gray-500 p-1.5 text-xs font-medium text-gray-300 dark:bg-gray-600">
              #{baseData?.id}
            </span>
            <LazyLoadImage
              loading="lazy"
              className={`${pokemonClassName}`}
              alt={baseData?.name}
              src={baseData?.sprites.front_default ?? ""}
            />
          </div>
        </figure>
      </div>
    </Link>
  );
}
