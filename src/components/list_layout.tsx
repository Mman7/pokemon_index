import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LoadingView from "./loading";
import { useLocation } from "react-router";
import type { NamedAPIResource, NamedAPIResourceList } from "pokenode-ts";

interface ListLayoutProps {
  queryKey: [string];
  queryFn: (pageParam: any) => Promise<NamedAPIResourceList>;
  ItemComponent: React.ComponentType<{ item: NamedAPIResource }>;
}

export function ListLayout({
  queryKey,
  queryFn,
  ItemComponent,
}: ListLayoutProps) {
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
    queryKey: queryKey,
    queryFn: queryFn,
    retry: 2,
    initialPageParam: 0,
    enabled: inView,
    staleTime: Infinity,
    gcTime: Infinity, // v5 (cacheTime in v4)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) return undefined; // stop fetching when no more
      return pages.length * 20; // offset for next fetch
    },
  });

  // If user reached bottom fetch more data
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    const state = location.state;
    if (state && state.searchData) setSearchData(state.searchData);
  }, [location.state]);

  const items = data?.pages.flatMap((p) => p.results) ?? [];

  const hasNoResults: any =
    location?.state &&
    location.state?.searchInput !== "" &&
    searchData?.length < 1;
  const searchDataEmpty = searchData.length < 1;
  const visibleItem = !searchDataEmpty ? searchData : items;
  if (hasNoResults) return <h1 className="p-10 text-center"> Not Found</h1>;
  if (isLoading) return <LoadingView />;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;
  return (
    <Fragment>
      <section
        className={`grid w-full grid-cols-1 justify-items-center gap-6 p-6 md:grid-cols-2 md:justify-items-normal lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
      >
        {/* Normal List */}

        {visibleItem.map((item) => (
          <ItemComponent key={item.name} item={item} />
        ))}

        {/* Reached this div will fetch more data*/}
        {searchDataEmpty && (
          <div ref={ref}>{!isFetchingNextPage && <LoadingView />}</div>
        )}
      </section>
    </Fragment>
  );
}
