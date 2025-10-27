import PokemonCard from "../components/pokemon_item_card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getListPokemons } from "../api/pokemon_api";
import LoadingView from "../components/loading";
import { Outlet, useLocation } from "react-router";
import type { NamedAPIResource } from "pokenode-ts";

export default function PokemonList() {
  const { ref, inView } = useInView();
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
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
    queryFn: getListPokemons,
    retry: 2,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) return undefined; // stop fetching when no more
      return pages.length * 20; // offset for next fetch
    },
  });

  // If user reached bottom fetch more data
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  // scroll back to the card
  useEffect(() => {
    let state = location.state;
    if (
      state.searchData == undefined ||
      state.searchData == null ||
      state.searchData == ""
    )
      setSearchData([]);
    if (state && state.searchData) setSearchData(state.searchData);
    if (state && state.lastSeen) {
      console.log(state.lastSeen);
      refs.current[state.lastSeen]?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    }
  }, [location.state]);

  const items = data?.pages.flatMap((p) => p.results) ?? [];
  const hidden: string = location.pathname !== "/pokemon" ? "hidden" : "block";
  const hasSearchValue: boolean = location.state.searchInput !== "";
  const searchResults: any = location.state?.searchData;

  const hasResults =
    searchResults && searchResults.length < 1 && hasSearchValue;

  if (isLoading) return <LoadingView />;

  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  if (hasResults) return <h1>Pokemon Not Found</h1>;
  return (
    <Fragment>
      <div
        className={`${hidden} grid grid-cols-1 justify-items-center gap-6 p-6 md:grid-cols-2 md:justify-items-normal lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
      >
        {/* Search List */}
        {searchData.map((pokemon: NamedAPIResource, index) => (
          <div
            ref={(el) => {
              refs.current[pokemon.name] = el;
            }}
            key={index}
            className={`${searchData.length < 1 && "hidden"}`}
          >
            <PokemonCard name={pokemon.name} pokemonImgClassName="w-68" />
          </div>
        ))}

        {/* Normal List */}
        {items.map((item: NamedAPIResource, index) => (
          <div
            className={`${searchData.length > 0 && "hidden"} `}
            key={index}
            ref={(el) => {
              refs.current[item.name] = el;
            }}
          >
            <PokemonCard name={item.name} pokemonImgClassName="w-68" />
          </div>
        ))}
        {/* Reached this div will fetch more data*/}
        {searchData.length < 1 && (
          <div ref={ref}>{isFetchingNextPage && <LoadingView />}</div>
        )}
      </div>
      <Outlet />
    </Fragment>
  );
}
