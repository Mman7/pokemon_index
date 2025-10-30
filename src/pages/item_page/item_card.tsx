import { useQuery } from "@tanstack/react-query";
import type { NamedAPIResource } from "pokenode-ts";
import { getItemByName } from "../../api/pokemon_api";
import { Link, useLocation } from "react-router";

export default function ItemCard({ item }: { item: NamedAPIResource }) {
  const location = useLocation();
  const { data, isLoading } = useQuery({
    queryKey: [item.name],
    queryFn: () => getItemByName({ name: item.name }),
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
  return (
    <Link
      to={`/item/${data?.name}`}
      state={{
        ...location.state,
      }}
    >
      <div className="card gap-2.75 rounded-xl p-6 px-0 shadow-lg backdrop-brightness-120 duration-1000 hover:cursor-pointer hover:backdrop-brightness-140">
        <figure>
          <img
            className="w-24 rounded-xl bg-black/10 p-1"
            src={data?.sprites.default ?? undefined}
            alt={data?.name}
          />
        </figure>
        <div className="flex items-center justify-center gap-1">
          <div
            className={`${(data?.name.length ?? 0) > 1 && "text-xs"} badge bg-gray-500 p-2 text-sm font-medium text-gray-400 capitalize dark:bg-gray-600`}
          >
            #{data?.id}
          </div>
          <span className="badge bg-gray-500 text-base font-medium capitalize dark:bg-gray-600">
            {data?.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
