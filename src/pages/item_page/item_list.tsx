import type { NamedAPIResource } from "pokenode-ts";
import { Fragment } from "react/jsx-runtime";
import ItemCard from "./item_card";

export default function ItemList({
  items,
  isShowing,
  refs,
}: {
  items: NamedAPIResource[];
  isShowing: boolean;
  refs: any;
}) {
  return (
    <Fragment>
      {items.map((item: NamedAPIResource, index) => (
        <div
          className={` ${isShowing ? "block" : "hidden"}`}
          key={index}
          ref={(el) => {
            refs.current[item.name] = el;
          }}
        >
          <ItemCard item={item} />
        </div>
      ))}
    </Fragment>
  );
}
