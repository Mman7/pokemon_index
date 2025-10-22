import { useQuery } from "@tanstack/react-query";
import { PokemonClient, type Pokemon } from "pokenode-ts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router";
//TODO stats chart
//TODO custom type badges style
//TODO id on top left
const api = new PokemonClient();

const getPokemonDetail = async (name: string) => {
  const data: Pokemon = await api.getPokemonByName(name);
  return data;
};

export default function PokemonCard({ name }: { name: string }) {
  const { data, error, isLoading } = useQuery({
    queryKey: [name],
    queryFn: () => getPokemonDetail(name),
  });

  if (isLoading)
    return (
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
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
            <div className="indicator-item indicator-center badge badge-primary flex gap-5">
              <span className="badge">Badge</span>
              <span className="badge">Badge</span>
            </div>
            <span className="indicator-item indicator-bottom indicator-center badge badge-secondary">
              {data?.name}
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
