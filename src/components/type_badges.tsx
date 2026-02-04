import React from "react";

export const typeClassMap: Record<string, string> = {
  poison: "badge-primary",
  grass: "badge-success",
  fire: "badge-error",
  water: "badge-info",
  electric: "badge-warning",
  ice: "bg-sky-200 text-black",
  bug: "badge-accent",
  ground: "bg-yellow-700 border-yellow-700",
  rock: "bg-yellow-800 border-yellow-800",
  dragon: "bg-violet-400 border-violet-400",
  fighting: "bg-yellow-700 border-yellow-700",
  flying: "bg-sky-300 text-black",
  fairy: "badge-secondary",
  psychic: "badge-secondary",
  normal: "bg-gray-600 text-white border-white",
};

export const TypeBadges = React.memo(
  ({ type, fontSize }: { type: string; fontSize: string }) => {
    const defaultStyle = `badge capitalize font-medium p-3  ${fontSize}`;
    const typeClass = React.useMemo(
      () => typeClassMap[type] ?? "badge-neutral",
      [type],
    );

    return <div className={` ${typeClass} ${defaultStyle}`}>{type}</div>;
  },
);
