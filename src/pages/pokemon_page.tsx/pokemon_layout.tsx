import PokemonCard from "../../components/pokemon_item_card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getPokemonsList } from "../../api/pokemon_api";
import LoadingView from "../../components/loading";
import { Outlet, useLocation, useMatch } from "react-router";
import type { NamedAPIResource } from "pokenode-ts";
import PokemonList from "./pokemon_list";

export default function PokemonLayout() {
  const { ref, inView } = useInView();
  const pokemonsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const location = useLocation();
  const [searchData, setSearchData] = useState<NamedAPIResource[]>([]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: getPokemonsList,
    retry: 2,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) return undefined; // stop fetching when no more
      return pages.length * 20; // offset for next fetch
    },
  });

  const restoreScrollPosition = () => {
    if (location.state && location?.state.pokemon) {
      pokemonsRefs.current[location?.state.pokemon.name]?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    }
  };

  // If user reached bottom fetch more data
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  // scroll back to the card
  useEffect(() => {
    let state = location.state;
    if (state && state.searchData) setSearchData(state.searchData);
    restoreScrollPosition();
  }, [location.state]);

  const items = data?.pages.flatMap((p) => p.results) ?? [];
  const isPokemonDetailPage = useMatch("/pokemon/:name");
  const hasSearchValue: boolean =
    location.state && location.state?.searchInput !== "";
  const searchResults: any = location.state && location.state?.searchData;

  const hasResults =
    searchResults && searchResults.length < 1 && hasSearchValue;

  if (isLoading) return <LoadingView />;

  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  if (hasResults) return <h1>Pokemon Not Found</h1>;

  const searchDataEmpty = searchData.length < 1;

  return (
    <Fragment>
      <section
        className={`${isPokemonDetailPage && "hidden"} grid w-full grid-cols-1 justify-items-center gap-6 p-6 md:grid-cols-2 md:justify-items-normal lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
      >
        {/* Search List */}
        <PokemonList
          isShowing={!searchDataEmpty}
          items={searchData}
          refs={pokemonsRefs}
        />

        {/* Normal List */}
        <PokemonList
          isShowing={searchDataEmpty}
          items={items}
          refs={pokemonsRefs}
        />

        {/* Reached this div will fetch more data*/}
        {searchDataEmpty && (
          <div ref={ref}>{!isFetchingNextPage && <LoadingView />}</div>
        )}
      </section>
      <Outlet />
    </Fragment>
  );
}
