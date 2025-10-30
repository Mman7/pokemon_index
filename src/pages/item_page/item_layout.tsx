import { useInfiniteQuery } from "@tanstack/react-query";
import { getItemList } from "../../api/pokemon_api";
import LoadingView from "../../components/loading";
import ItemCard from "./item_card";
import { Fragment, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Outlet, useLocation, useMatch } from "react-router";

export default function ItemLayout() {
  const { ref, inView } = useInView();
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const location = useLocation();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
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

  useEffect(() => {
    // back to the item with name
    if (location.state && location?.state.item) {
      refs.current[location?.state.item.name]?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    }
  }, [location.state]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  if (isLoading) <LoadingView />;
  if (error) <div>{error.message}</div>;

  const isitemDetailPage = useMatch("/item/:name");
  const items = data?.pages.flatMap((p) => p.results) ?? [];

  return (
    <Fragment>
      <div
        className={`${isitemDetailPage && "hidden"} grid grid-cols-1 justify-items-center gap-6 p-6 md:grid-cols-2 md:justify-items-normal lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
      >
        {items.map((item, index) => (
          <div
            ref={(el) => {
              refs.current[item.name] = el;
            }}
            key={index}
          >
            <ItemCard item={item} />
          </div>
        ))}
      </div>
      {!isitemDetailPage && (
        <div ref={ref}>{!isFetchingNextPage && <LoadingView />}</div>
      )}
      <Outlet />
    </Fragment>
  );
}
