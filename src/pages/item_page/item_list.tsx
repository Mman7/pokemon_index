import type { NamedAPIResource } from "pokenode-ts";
import type { ReactElement } from "react";

export default function ItemList({
  items,
  isShowing,
  refs,
  children,
}: {
  items: NamedAPIResource[];
  isShowing: boolean;
  refs: any;
  children: (item: NamedAPIResource) => ReactElement;
}) {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.name}
          className={isShowing ? "block" : "hidden"}
          ref={(el) => {
            refs.current[item.name] = el;
          }}
        >
          {children(item)}
        </div>
      ))}
    </>
  );
}
