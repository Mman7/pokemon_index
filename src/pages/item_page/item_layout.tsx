import { useInfiniteQuery } from "@tanstack/react-query";
import { getItemList } from "../../api/pokemon_api";
import LoadingView from "../../components/loading";
import { Fragment, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Outlet, useLocation, useMatch } from "react-router";
import ItemList from "../../components/item_list";
import type { NamedAPIResource } from "pokenode-ts";
import ItemCard from "./item_card";

export default function ItemLayout() {
  const { ref, inView } = useInView();
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const location = useLocation();
  const [searchData, setSearchData] = useState<NamedAPIResource[]>([]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: getItemList,
    retry: 2,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) return undefined; // stop fetching when no more
      return pages.length * 20; // offset for next fetch
    },
  });

  // back to the item with name
  const restoreScrollPosition = () => {
    if (location.state && location?.state.item) {
      itemRefs.current[location?.state.item.name]?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    }
  };

  useEffect(() => {
    let state = location.state;
    if (state && state.searchData) setSearchData(state.searchData);
    restoreScrollPosition();
  }, [location.state]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) fetchNextPage();
  }, [inView]);
  // if search value has nothing return element
  const hasSearchValue: boolean =
    location.state && location.state?.searchInput !== "";
  const searchResults: any = location.state && location.state?.searchData;

  const hasResults =
    searchResults && searchResults.length < 1 && hasSearchValue;

  const isitemDetailPage = useMatch("/item/:name");
  const items = data?.pages.flatMap((p) => p.results) ?? [];

  const searchDataEmpty = searchData.length < 1;

  if (isLoading) return <LoadingView />;
  if (error) <div>{error.message}</div>;
  if (hasResults) return <h1 className="text-center">Item Not Found</h1>;
  return (
    <Fragment>
      <section
        className={`${isitemDetailPage && "hidden"} grid grid-cols-1 justify-items-center gap-6 p-6 md:grid-cols-2 md:justify-items-normal lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
      >
        {/* Search List */}
        <ItemList
          items={searchData}
          isShowing={!searchDataEmpty}
          refs={itemRefs}
        >
          {(item) => <ItemCard item={item} />}
        </ItemList>

        {/* Normal List */}
        <ItemList items={items} isShowing={searchDataEmpty} refs={itemRefs}>
          {(item) => <ItemCard item={item} />}
        </ItemList>

        {/*  Reached this div will fetch more data */}
        {hasNextPage && searchDataEmpty && (
          <div ref={ref}>{!isFetchingNextPage && <LoadingView />}</div>
        )}
      </section>
      <Outlet />
    </Fragment>
  );
}
