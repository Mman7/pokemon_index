import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getPokemonsList } from "../../api/pokemon_api";
import LoadingView from "../../components/loading";
import { useLocation } from "react-router";
import type { NamedAPIResource } from "pokenode-ts";
import ItemList from "../../components/item_list";
import PokemonCard from "../../components/pokemon_item_card";

export default function PokemonLayout() {
  const { ref, inView } = useInView();
  const location = useLocation();
  const [searchData, setSearchData] = useState<NamedAPIResource[]>([]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    error,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: getPokemonsList,
    retry: 2,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
    enabled: inView,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) return undefined; // stop fetching when no more
      return pages.length * 20; // offset for next fetch
    },
  });

  // If user reached bottom fetch more data
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) fetchNextPage();
  }, [inView]);

  // scroll back to the card
  useEffect(() => {
    let state = location.state;
    if (state && state.searchData) setSearchData(state.searchData);
  }, [location.state]);

  const items = data?.pages.flatMap((p) => p.results) ?? [];

  const hasNoResults: any =
    location?.state &&
    location.state?.searchInput !== "" &&
    searchData?.length < 1;
  const searchDataEmpty = searchData.length < 1;
  const visibleItem = !searchDataEmpty ? searchData : items;
  if (hasNoResults)
    return <h1 className="p-10 text-center">Pokemon Not Found</h1>;
  if (isLoading) return <LoadingView />;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <Fragment>
      <section
        className={`grid w-full grid-cols-1 justify-items-center gap-6 p-6 md:grid-cols-2 md:justify-items-normal lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
      >
        {/* Normal List */}
        <ItemList items={visibleItem}>
          {(item) => (
            <PokemonCard name={item.name} pokemonImgClassName={"w-58"} />
          )}
        </ItemList>

        {/* Reached this div will fetch more data*/}
        {searchDataEmpty && (
          <div ref={ref}>{!isFetchingNextPage && <LoadingView />}</div>
        )}
      </section>
    </Fragment>
  );
}
