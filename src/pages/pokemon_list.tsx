import PokemonCard from "../components/pokemon_item_card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getListPokemons } from "../api/pokemon_api";
import LoadingView from "../components/loading";
import { Outlet, useLocation } from "react-router";

export default function PokemonList() {
  const { ref, inView } = useInView();
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const location = useLocation();
  const [search, setSearch] = useState(null);
  window.history.replaceState({}, "");

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
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // scroll back to the card
  useEffect(() => {
    let state = location.state;
    if (
      state?.searchData == undefined ||
      state?.searchData == null ||
      state?.searchData == ""
    )
      setSearch(null);

    if (state && state?.searchData) setSearch(state.searchData);
    if (state && state.pokemon) {
      refs.current[state.pokemon]?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    }
  }, [location.state]);

  if (isLoading) return <LoadingView />;

  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  const items = data?.pages.flatMap((p) => p.results) ?? [];

  const hidden = location.pathname !== "/pokemon" ? "hidden" : "block";

  return (
    <>
      <div
        className={` ${hidden} grid grid-cols-1 justify-items-center gap-6 p-6 md:grid-cols-2 md:justify-items-normal lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
      >
        {search && <PokemonCard name={search} />}

        {!search &&
          items.map((item) => (
            <div
              className={`${search && "hidden"}`}
              key={item.name}
              ref={(el) => {
                refs.current[item.name] = el;
              }}
            >
              <PokemonCard name={item.name} />
            </div>
          ))}
        <div ref={ref}>{isFetchingNextPage && <LoadingView />}</div>
      </div>
      <Outlet />
    </>
  );
}
