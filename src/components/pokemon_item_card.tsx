import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router";
import { TypeBadges } from "./type_badges";
import { getPokemonDetail } from "../api/pokemon_api";
//TODO stats chart

export default function PokemonCard({ name }: { name: string }) {
  const { data, error, isLoading } = useQuery({
    queryKey: [name],
    queryFn: () => getPokemonDetail(name),
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
  if (error)
    return (
      <div className="grid h-3/4 justify-items-center">
        An error occurred: {error.message}
      </div>
    );
  return (
    <Link
      to={`${name}`}
      state={{
        pokemon: data,
      }}
    >
      <div className="card rounded-xl shadow-lg backdrop-brightness-120 duration-1000 hover:cursor-pointer hover:backdrop-brightness-140">
        <figure className="p-8">
          <div className="indicator rounded-2xl bg-black/5">
            <div className="indicator-item indicator-center badge flex gap-5 border-0 bg-transparent">
              {data?.types.map((a) => (
                <TypeBadges key={a.type.name} type={a.type.name} />
              ))}
            </div>
            <span className="indicator-item indicator-bottom indicator-center badge bg-gray-500 p-4 text-lg font-medium text-white capitalize dark:bg-gray-600">
              {name}
            </span>
            <span className="indicator-item indicator-start indicator-bottom badge bg-gray-500 font-medium text-gray-300 dark:bg-gray-600">
              # {data?.id}
            </span>
            <LazyLoadImage
              className="w-64"
              alt={data?.name}
              src={data?.sprites.front_default ?? ""}
            />
          </div>
        </figure>
      </div>
    </Link>
  );
}
