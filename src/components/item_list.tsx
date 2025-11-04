import type { NamedAPIResource } from "pokenode-ts";
import type { ReactElement } from "react";
import React from "react";

export default (function ItemList({
  items,
  children,
}: {
  items: NamedAPIResource[];
  children: (item: NamedAPIResource) => ReactElement;
}) {
  return (
    <>
      {items.map((item) => (
        <React.Fragment key={item.name}>{children(item)}</React.Fragment>
      ))}
    </>
  );
});
