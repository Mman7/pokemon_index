import PokemonCard from "../components/pokemon_item_card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { retrieveData } from "../api/pokemon_api";
import LoadingView from "../components/loading";

//TODO finish search functionality
//TODO add when user back to pokemon page keep position

export default function PokemonList() {
  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: retrieveData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) return undefined; // stop fetching when no more
      return pages.length * 20; // offset for next fetch
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) return <LoadingView />;

  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div className="grid grid-cols-1 justify-items-center gap-6 p-6 md:grid-cols-2 md:justify-items-normal lg:grid-cols-3 xl:grid-cols-5">
      {(data?.pages.flatMap((page) => page.results) ?? []).map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} />
      ))}
      <div ref={ref}>{isFetchingNextPage && <LoadingView />}</div>
    </div>
  );
}
