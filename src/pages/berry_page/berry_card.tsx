import type { NamedAPIResource } from "pokenode-ts";
import { Link, useLocation } from "react-router";
import { getBerryByName, getItemByName } from "../../api/pokemon_api";
import { useQuery } from "@tanstack/react-query";
import ItemImg from "../../components/item_img";
import ItemCardSkeleton from "../../components/item_card_skeleton";

export default function BerryCard({ item }: { item: NamedAPIResource }) {
  const location = useLocation();
  const prevState = location.state;
  const { data: berry, isLoading: berryDataLoading } = useQuery({
    queryKey: [item.name],
    queryFn: () => getBerryByName({ name: item.name }),
  });
  const { data: itemData, isLoading: itemDataLoading } = useQuery({
    queryKey: [berry?.item.name],
    queryFn: () => getItemByName({ name: berry?.item.name ?? "" }),
  });

  if (berryDataLoading || itemDataLoading) return <ItemCardSkeleton />;

  return (
    <Link
      to={`/berry/${berry?.name}`}
      state={{
        ...prevState,
        berry: berry,
        itemData: itemData,
      }}
    >
      <div className="card gap-2.75 rounded-xl p-6 shadow-lg backdrop-brightness-120 duration-1000 hover:cursor-pointer hover:backdrop-brightness-140">
        <ItemImg alt={berry?.name} src={itemData?.sprites.default} />
        <div className="flex items-center justify-center gap-1">
          <div
            className={`badge bg-gray-500 p-2 text-sm font-medium text-gray-300 capitalize dark:bg-gray-600 dark:text-gray-400`}
          >
            #{berry?.id}
          </div>
          <span
            className={`${(berry?.name.length ?? 0) > 12 && "text-xs"} badge bg-gray-500 px-3 py-3 text-base font-medium whitespace-nowrap text-white capitalize dark:bg-gray-600`}
          >
            {berry?.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
